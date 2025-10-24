<?php

namespace App\Console\Commands\Search;

use App\Entity\Adverts\Advert\Advert;
use App\Entity\Banner\Banner;
use App\Services\Search\AdvertIndexer;
use App\Services\Search\BannerIndexer;
use Illuminate\Console\Command;

class ReindexCommand extends Command
{
    protected $signature = 'search:reindex';

    private $adverts;
    private $banners;

    public function __construct(AdvertIndexer $adverts, BannerIndexer $banners)
    {
        parent::__construct();
        $this->adverts = $adverts;
        $this->banners = $banners;
    }
    
    public function handle(): int
    {
        $this->adverts->clear();
        $this->info('Cleared adverts index');

        foreach (Advert::active()->orderBy('id')->cursor() as $advert) {
            $this->adverts->index($advert);
        }
        $this->info('Reindexed adverts');

        $this->banners->clear();
        $this->info('Cleared banners index');

        foreach (Banner::active()->orderBy('id')->cursor() as $banner) {
            $this->banners->index($banner);
        }
        $this->info('Reindexed banners');

        return 0;
    }
}
