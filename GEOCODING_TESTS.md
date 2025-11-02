# Geocoding Module Tests

Comprehensive test suite for the Universal Geocoding System.

## Test Structure

```
tests/
├── Unit/
│   ├── Entity/
│   │   ├── RegionTest.php             # Region model tests
│   │   └── PostalCodeTest.php         # PostalCode model tests
│   └── Services/
│       └── Geocoding/
│           ├── AddressResultTest.php         # DTO tests
│           ├── PostcodesIoGeocoderTest.php   # UK API tests
│           ├── GoogleMapsGeocoderTest.php    # Google Maps API tests
│           └── GeocodingServiceTest.php      # Main service tests
└── Feature/
    └── Api/
        └── PostalCodeControllerTest.php # API endpoint tests
```

## Running Tests

### Run all tests

```bash
docker-compose exec php-cli php artisan test
```

### Run specific test suite

```bash
# Run all geocoding tests
docker-compose exec php-cli php artisan test --testsuite=Unit --filter=Geocoding

# Run model tests
docker-compose exec php-cli php artisan test tests/Unit/Entity/RegionTest.php
docker-compose exec php-cli php artisan test tests/Unit/Entity/PostalCodeTest.php

# Run service tests
docker-compose exec php-cli php artisan test tests/Unit/Services/Geocoding/

# Run API tests
docker-compose exec php-cli php artisan test tests/Feature/Api/PostalCodeControllerTest.php
```

### Run with coverage

```bash
docker-compose exec php-cli php artisan test --coverage
```

### Run specific test method

```bash
docker-compose exec php-cli php artisan test --filter=testLookupPostalCodeSuccess
```

## Test Coverage

### Region Model Tests (tests/Unit/Entity/RegionTest.php)

- ✅ Create region with all fields
- ✅ Region hierarchy (parent/children)
- ✅ Get path (hierarchical slug path)
- ✅ Get address (hierarchical name path)
- ✅ Scope: roots (countries)
- ✅ Scope: byCountry
- ✅ Scope: byType
- ✅ Get country (traverse to root)
- ✅ Has coordinates check
- ✅ Postal codes relation

### PostalCode Model Tests (tests/Unit/Entity/PostalCodeTest.php)

- ✅ Create postal code with all fields
- ✅ Scope: byCountry
- ✅ Scope: byCode
- ✅ Get full address (formatted)
- ✅ Get full address with partial data
- ✅ Has coordinates check
- ✅ Region relation
- ✅ Metadata JSON cast
- ✅ Unique code constraint

### AddressResult DTO Tests (tests/Unit/Services/Geocoding/AddressResultTest.php)

- ✅ Construction with all parameters
- ✅ Get full address formatting
- ✅ Get full address with partial data
- ✅ Get full address with minimal data
- ✅ Convert to array for database

### PostcodesIoGeocoder Tests (tests/Unit/Services/Geocoding/PostcodesIoGeocoderTest.php)

- ✅ Lookup postal code success (HTTP mock)
- ✅ Lookup postal code not found
- ✅ Lookup postal code API error
- ✅ Geocode not supported (returns null)
- ✅ Reverse geocode success
- ✅ Reverse geocode no results
- ✅ Supports country (GB only)

### GoogleMapsGeocoder Tests (tests/Unit/Services/Geocoding/GoogleMapsGeocoderTest.php)

- ✅ Lookup postal code success
- ✅ Geocode with full address
- ✅ Reverse geocode success
- ✅ Geocode not found
- ✅ Geocode API error
- ✅ Geocode without postal code (invalid)
- ✅ Supports country (all countries)
- ✅ Metadata is included

### GeocodingService Tests (tests/Unit/Services/Geocoding/GeocodingServiceTest.php)

- ✅ Lookup postal code from database cache
- ✅ Lookup postal code with API and cache result
- ✅ Postal code normalization (uppercase, trim)
- ✅ Detect country from postal code format
- ✅ Register custom geocoder
- ✅ Reverse geocode with nearby cache
- ✅ Reverse geocode with API
- ✅ Geocode full address
- ✅ Lookup postal code not found

### PostalCodeController API Tests (tests/Feature/Api/PostalCodeControllerTest.php)

- ✅ GET /api/postal-codes/{code} - Success from cache
- ✅ GET /api/postal-codes/{code} - Not found
- ✅ GET /api/postal-codes/{code} - Success from API
- ✅ POST /api/geocode - Success
- ✅ POST /api/geocode - Validation errors
- ✅ POST /api/geocode - Not found
- ✅ POST /api/reverse-geocode - Success
- ✅ POST /api/reverse-geocode - Validation errors
- ✅ POST /api/reverse-geocode - Not found
- ✅ POST /api/reverse-geocode - Success from cache

## Test Data Examples

### UK Postal Code (Postcodes.io)

```php
PostalCode::create([
    'code' => 'SW1A 1AA',
    'country_code' => 'GB',
    'street' => '10 Downing Street',
    'district' => 'Westminster',
    'city' => 'London',
    'state' => 'England',
    'latitude' => 51.5033,
    'longitude' => -0.1276,
]);
```

### US ZIP Code (Google Maps)

```php
PostalCode::create([
    'code' => '90210',
    'country_code' => 'US',
    'city' => 'Beverly Hills',
    'state' => 'California',
    'latitude' => 34.0901,
    'longitude' => -118.4065,
]);
```

### Ukraine Postal Code

```php
PostalCode::create([
    'code' => '01001',
    'country_code' => 'UA',
    'city' => 'Kyiv',
    'latitude' => 50.4501,
    'longitude' => 30.5234,
]);
```

## HTTP Mocking

All tests use Laravel's HTTP facade mocking to avoid real API calls:

```php
Http::fake([
    'api.postcodes.io/*' => Http::response([
        'status' => 200,
        'result' => [
            'postcode' => 'SW1A 1AA',
            'latitude' => 51.5033,
            'longitude' => -0.1276,
        ],
    ], 200),
]);
```

## Database Transactions

All database-related tests use `DatabaseTransactions` trait to:
- Automatically rollback changes after each test
- Keep test database clean
- Ensure test isolation

```php
use Illuminate\Foundation\Testing\DatabaseTransactions;

class RegionTest extends TestCase
{
    use DatabaseTransactions;

    // Tests...
}
```

## Assertions Examples

### Model Assertions

```php
self::assertNotNull($region->id);
self::assertEquals('United Kingdom', $region->name);
self::assertCount(2, $region->children);
```

### API Response Assertions

```php
$response->assertStatus(200)
    ->assertJson([
        'postal_code' => 'SW1A 1AA',
        'country_code' => 'GB',
    ]);
```

### Database Assertions

```php
$this->assertDatabaseHas('postal_codes', [
    'code' => 'SW1A 1AA',
    'country_code' => 'GB',
]);
```

### HTTP Assertions

```php
Http::assertSent(function ($request) {
    return $request->url() === 'https://api.postcodes.io/postcodes/SW1A1AA';
});

Http::assertNothingSent(); // Verify cache was used
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests
        run: |
          docker-compose up -d
          docker-compose exec -T php-cli php artisan test
```

## Troubleshooting

### Tests fail with "Database not found"

Make sure migrations are run:
```bash
docker-compose exec php-cli php artisan migrate --env=testing
```

### Tests fail with HTTP connection errors

Check that HTTP facade is properly mocked:
```php
Http::fake([...]);
```

### Tests are slow

- Check if real API calls are being made (should use mocks)
- Verify database transactions are working
- Consider using in-memory SQLite for faster tests

## Best Practices

1. **Always mock external APIs** - Use `Http::fake()` for all API tests
2. **Use database transactions** - Keep test database clean
3. **Test edge cases** - Invalid inputs, missing data, API errors
4. **Verify caching** - Ensure results are cached properly
5. **Test validation** - Check all validation rules work
6. **Assert API calls** - Verify correct APIs are called with correct params

## Adding New Tests

When adding new geocoders or features:

1. Create test file in appropriate directory
2. Extend `TestCase` or use existing test structure
3. Mock external dependencies with `Http::fake()`
4. Use `DatabaseTransactions` for database tests
5. Follow existing naming conventions
6. Document test purpose with clear method names