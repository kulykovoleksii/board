<?php

namespace App\Console\Commands\Search;

use Elastic\Elasticsearch\Exception\ClientResponseException;
use Illuminate\Console\Command;
use Elastic\Elasticsearch\Client;

class InitCommand extends Command
{
    protected $signature = 'search:init';

    private $client;

    public function __construct(Client $client)
    {
        parent::__construct();
        $this->client = $client;
    }
    
    public function handle(): int
    {
        $this->initAdverts();
        $this->info('Adverts index created');

        $this->initBanners();
        $this->info('Banners index created');

        return 0;
    }

    private function initAdverts(): void
    {
        try {
            $this->client->indices()->delete([
                'index' => 'adverts'
            ]);
        } catch (ClientResponseException $e) {
        }

        $this->client->indices()->create([
            'index' => 'adverts',
            'body' => [
                'mappings' => [
                    '_source' => [
                        'enabled' => true,
                    ],
                    'properties' => [
                            'id' => [
                                'type' => 'integer',
                            ],
                            'published_at' => [
                                'type' => 'date',
                            ],
                            'title' => [
                                'type' => 'text',
                            ],
                            'content' => [
                                'type' => 'text',
                            ],
                            'price' => [
                                'type' => 'integer',
                            ],
                            'status' => [
                                'type' => 'keyword',
                            ],
                            'categories' => [
                                'type' => 'integer',
                            ],
                            'regions' => [
                                'type' => 'integer',
                            ],
                            'values' => [
                                'type' => 'nested',
                                'properties' => [
                                    'attribute' => [
                                        'type' => 'integer'
                                    ],
                                    'value_string' => [
                                        'type' => 'keyword',
                                    ],
                                    'value_int' => [
                                        'type' => 'integer',
                                    ],
                                ],
                            ],
                        ],
                    ],
                'settings' => [
                    'max_ngram_diff' => 3,
                    'analysis' => [
                        'char_filter' => [
                            'replace' => [
                                'type' => 'mapping',
                                'mappings' => [
                                    '&=> and '
                                ],
                            ],
                        ],
                        'filter' => [
                            'word_delimiter' => [
                                'type' => 'word_delimiter',
                                'split_on_numerics' => false,
                                'split_on_case_change' => true,
                                'generate_word_parts' => true,
                                'generate_number_parts' => true,
                                'catenate_all' => true,
                                'preserve_original' => true,
                                'catenate_numbers' => true,
                            ],
                            'trigrams' => [
                                'type' => 'ngram',
                                'min_gram' => 4,
                                'max_gram' => 6,
                            ],
                        ],
                        'analyzer' => [
                            'default' => [
                                'type' => 'custom',
                                'char_filter' => [
                                    'html_strip',
                                    'replace',
                                ],
                                'tokenizer' => 'whitespace',
                                'filter' => [
                                    'lowercase',
                                    'word_delimiter',
                                    'trigrams',
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ]);
    }

    private function initBanners(): void
    {
        try {
            $this->client->indices()->delete([
                'index' => 'banners'
            ]);
        } catch (ClientResponseException $e) {
        }

        $this->client->indices()->create([
            'index' => 'banners',
            'body' => [
                'mappings' => [
                    '_source' => [
                        'enabled' => true,
                    ],
                    'properties' => [
                        'id' => [
                            'type' => 'integer',
                        ],
                        'status' => [
                            'type' => 'keyword',
                        ],
                        'format' => [
                            'type' => 'keyword',
                        ],
                        'categories' => [
                            'type' => 'integer',
                        ],
                        'regions' => [
                            'type' => 'integer',
                        ],
                    ],
                ],
            ],
        ]);
    }
}
