# Universal Geocoding System - Usage Guide

## Overview

This system provides universal address lookup and geocoding for all countries worldwide, with special optimizations for UK postcodes.

## Features

- **Multi-country support**: Works with postal codes from UK, USA, Ukraine, Canada, and more
- **Multiple providers**:
  - Postcodes.io (free, UK-specific)
  - Google Maps Geocoding API (universal, paid after free tier)
- **Automatic fallback**: Tries free APIs first, falls back to Google Maps
- **Database caching**: Results cached to minimize API calls
- **Coordinate lookup**: Reverse geocoding from lat/lng to address

## Setup

### 1. Run migrations

```bash
docker-compose exec php-cli php artisan migrate
```

### 2. Configure Google Maps API (optional but recommended for worldwide coverage)

Add to your `.env`:

```env
GOOGLE_MAPS_API_KEY=your_api_key_here
```

Get your API key: https://console.cloud.google.com/google/maps-apis

**Pricing**: $200/month free credit (~40,000 requests/month free)

### 3. Register routes (example)

Add to `routes/api.php`:

```php
use App\Http\Controllers\Api\PostalCodeController;

Route::get('/postal-codes/{code}', [PostalCodeController::class, 'show']);
Route::post('/geocode', [PostalCodeController::class, 'geocode']);
Route::post('/reverse-geocode', [PostalCodeController::class, 'reverseGeocode']);
```

## Usage Examples

### Example 1: Lookup UK Postcode

```php
use App\Services\Geocoding\GeocodingService;

$geocoding = app(GeocodingService::class);

// Lookup UK postcode (uses free Postcodes.io)
$result = $geocoding->lookupPostalCode('SW1A 1AA');

echo $result->getFullAddress();
// Output: Westminster, London, SW1A 1AA

echo $result->latitude;  // 51.5033
echo $result->longitude; // -0.1276
```

### Example 2: Lookup USA ZIP Code

```php
// Lookup US ZIP (uses Google Maps API)
$result = $geocoding->lookupPostalCode('90210');

echo $result->city;  // Beverly Hills
echo $result->state; // California
```

### Example 3: Lookup Ukraine Postal Code

```php
// Lookup Ukraine postal code
$result = $geocoding->lookupPostalCode('01001');

echo $result->city;  // Kyiv
```

### Example 4: Full Address Geocoding

```php
// Geocode full address to coordinates
$result = $geocoding->geocode('10 Downing Street, London, UK');

echo $result->latitude;   // 51.5033
echo $result->longitude;  // -0.1276
echo $result->postalCode; // SW1A 2AA
```

### Example 5: Reverse Geocoding

```php
// Convert coordinates to address
$result = $geocoding->reverseGeocode(51.5033, -0.1276);

echo $result->getFullAddress();
// Output: 10 Downing Street, Westminster, London, SW1A 2AA
```

### Example 6: Using in a Controller

```php
use App\Services\Geocoding\GeocodingService;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    public function __construct(
        private readonly GeocodingService $geocoding
    ) {}

    public function validateAddress(Request $request)
    {
        $postalCode = $request->input('postal_code');

        $result = $this->geocoding->lookupPostalCode($postalCode);

        if (!$result) {
            return response()->json(['error' => 'Invalid postal code'], 422);
        }

        return response()->json([
            'valid' => true,
            'address' => $result->getFullAddress(),
            'coordinates' => [
                'lat' => $result->latitude,
                'lng' => $result->longitude,
            ],
        ]);
    }
}
```

### Example 7: Working with Regions

```php
use App\Entity\Region;
use App\Entity\PostalCode;

// Create region hierarchy
$uk = Region::create([
    'name' => 'United Kingdom',
    'slug' => 'uk',
    'country_code' => 'GB',
    'type' => 'country',
]);

$london = Region::create([
    'name' => 'London',
    'slug' => 'london',
    'country_code' => 'GB',
    'type' => 'city',
    'parent_id' => $uk->id,
]);

// Link postal code to region
$postalCode = PostalCode::create([
    'code' => 'SW1A 1AA',
    'country_code' => 'GB',
    'city' => 'London',
    'region_id' => $london->id,
    'latitude' => 51.5033,
    'longitude' => -0.1276,
]);

// Query postal codes by region
$londonPostcodes = $london->postalCodes;

// Get country for any region (traverses up hierarchy)
$country = $london->getCountry(); // Returns UK region
```

## API Endpoints

### GET /api/postal-codes/{code}

Lookup address by postal code.

**Example requests:**
- UK: `/api/postal-codes/SW1A1AA`
- US: `/api/postal-codes/90210`
- UA: `/api/postal-codes/01001`

**Response:**
```json
{
  "postal_code": "SW1A 1AA",
  "country_code": "GB",
  "address": {
    "street": null,
    "district": "Westminster",
    "city": "London",
    "state": "England",
    "full": "Westminster, London, SW1A 1AA"
  },
  "coordinates": {
    "latitude": 51.5033,
    "longitude": -0.1276
  },
  "metadata": {
    "country": "England",
    "parliamentary_constituency": "Cities of London and Westminster"
  }
}
```

### POST /api/geocode

Geocode full address.

**Request:**
```json
{
  "address": "10 Downing Street, London, UK",
  "country_code": "GB"
}
```

### POST /api/reverse-geocode

Reverse geocode coordinates.

**Request:**
```json
{
  "latitude": 51.5033,
  "longitude": -0.1276
}
```

## Supported Postal Code Formats

| Country       | Code | Format Example    | Provider       |
|---------------|------|-------------------|----------------|
| United Kingdom| GB   | SW1A 1AA, M1 1AA  | Postcodes.io   |
| United States | US   | 90210, 10001-1234 | Google Maps    |
| Ukraine       | UA   | 01001, 79000      | Google Maps    |
| Canada        | CA   | K1A 0B1           | Google Maps    |
| Others        | *    | Various           | Google Maps    |

## Caching Strategy

1. **Database cache**: All lookup results are stored in `postal_codes` table
2. **Automatic reuse**: Subsequent lookups check database first
3. **Proximity search**: Reverse geocoding checks for nearby cached coordinates
4. **Cost optimization**: Minimizes API calls, especially to paid services

## Best Practices

1. **Always cache**: Results are automatically cached in database
2. **Use UK-specific API**: Postcodes.io is free and doesn't require API key
3. **Normalize input**: Postal codes are auto-normalized (uppercase, trimmed)
4. **Handle nulls**: Not all fields available for all postcodes
5. **Monitor usage**: Keep track of Google Maps API usage to stay within free tier

## Cost Optimization Tips

1. Pre-populate database with commonly used postal codes
2. Use Postcodes.io for UK addresses (completely free)
3. Implement rate limiting for postal code lookup endpoints
4. Consider bulk geocoding for large datasets
5. Monitor Google Maps API usage in Cloud Console

## Adding Custom Geocoders

```php
use App\Services\Geocoding\GeocoderInterface;
use App\Services\Geocoding\AddressResult;

class CustomGeocoder implements GeocoderInterface
{
    public function lookupPostalCode(string $postalCode): ?AddressResult
    {
        // Your implementation
    }

    public function supportsCountry(string $countryCode): bool
    {
        return $countryCode === 'XX';
    }

    // ... other methods
}

// Register in GeocodingService constructor
$geocoding->registerGeocoder(new CustomGeocoder());
```

## Troubleshooting

**Issue**: "Postal code not found"
- Check postal code format is correct
- Ensure Google Maps API key is configured for non-UK codes
- Check API quota hasn't been exceeded

**Issue**: Google Maps API errors
- Verify API key in `.env`
- Check billing is enabled in Google Cloud Console
- Ensure Geocoding API is enabled

**Issue**: UK postcodes not working
- Postcodes.io is free and doesn't require setup
- Check internet connectivity
- Verify postal code format (e.g., "SW1A 1AA" not "SW1A1AA")

## Testing

Comprehensive test suite is available. See [GEOCODING_TESTS.md](GEOCODING_TESTS.md) for detailed testing documentation.

### Run all tests

```bash
docker-compose exec php-cli php artisan test
```

### Run geocoding tests only

```bash
docker-compose exec php-cli php artisan test tests/Unit/Services/Geocoding/
docker-compose exec php-cli php artisan test tests/Feature/Api/PostalCodeControllerTest.php
```

### Test Coverage

- ✅ Region model (hierarchy, scopes, coordinates)
- ✅ PostalCode model (queries, formatting, relations)
- ✅ PostcodesIoGeocoder (UK postal codes)
- ✅ GoogleMapsGeocoder (universal geocoding)
- ✅ GeocodingService (caching, provider selection)
- ✅ PostalCodeController (API endpoints, validation)

All tests use HTTP mocking to avoid real API calls and database transactions for isolation.