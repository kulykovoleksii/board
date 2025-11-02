<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\Geocoding\GeocodingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Example controller demonstrating postal code lookup API
 */
class PostalCodeController extends Controller
{
    public function __construct(
        private readonly GeocodingService $geocodingService
    ) {
    }

    /**
     * Lookup address by postal code
     *
     * Example requests:
     * - UK: GET /api/postal-codes/SW1A1AA
     * - US: GET /api/postal-codes/90210
     * - UA: GET /api/postal-codes/01001
     *
     * @param string $postalCode
     * @return JsonResponse
     */
    public function show(string $postalCode): JsonResponse
    {
        $result = $this->geocodingService->lookupPostalCode($postalCode);

        if (!$result) {
            return response()->json([
                'error' => 'Postal code not found',
            ], 404);
        }

        return response()->json([
            'postal_code' => $result->postalCode,
            'country_code' => $result->countryCode,
            'address' => [
                'street' => $result->street,
                'district' => $result->district,
                'city' => $result->city,
                'state' => $result->state,
                'full' => $result->getFullAddress(),
            ],
            'coordinates' => [
                'latitude' => $result->latitude,
                'longitude' => $result->longitude,
            ],
            'metadata' => $result->metadata,
        ]);
    }

    /**
     * Geocode full address to coordinates
     *
     * Example: POST /api/geocode
     * Body: {"address": "10 Downing Street, London, UK"}
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function geocode(Request $request): JsonResponse
    {
        $request->validate([
            'address' => 'required|string',
            'country_code' => 'nullable|string|size:2',
        ]);

        $result = $this->geocodingService->geocode(
            $request->input('address'),
            $request->input('country_code')
        );

        if (!$result) {
            return response()->json([
                'error' => 'Address not found',
            ], 404);
        }

        return response()->json([
            'postal_code' => $result->postalCode,
            'country_code' => $result->countryCode,
            'address' => [
                'street' => $result->street,
                'district' => $result->district,
                'city' => $result->city,
                'state' => $result->state,
                'full' => $result->getFullAddress(),
            ],
            'coordinates' => [
                'latitude' => $result->latitude,
                'longitude' => $result->longitude,
            ],
        ]);
    }

    /**
     * Reverse geocode coordinates to address
     *
     * Example: POST /api/reverse-geocode
     * Body: {"latitude": 51.5033, "longitude": -0.1276}
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function reverseGeocode(Request $request): JsonResponse
    {
        $request->validate([
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
        ]);

        $result = $this->geocodingService->reverseGeocode(
            $request->input('latitude'),
            $request->input('longitude')
        );

        if (!$result) {
            return response()->json([
                'error' => 'Address not found for coordinates',
            ], 404);
        }

        return response()->json([
            'postal_code' => $result->postalCode,
            'country_code' => $result->countryCode,
            'address' => [
                'street' => $result->street,
                'district' => $result->district,
                'city' => $result->city,
                'state' => $result->state,
                'full' => $result->getFullAddress(),
            ],
            'coordinates' => [
                'latitude' => $result->latitude,
                'longitude' => $result->longitude,
            ],
        ]);
    }
}