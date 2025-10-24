<?php

namespace App\Entity\Tag;

use Illuminate\Database\Eloquent\Relations\MorphToMany;

trait Taggable
{
    /**
     * Get all tags for the model
     */
    public function tags(): MorphToMany
    {
        return $this->morphToMany(Tag::class, 'taggable')->withTimestamps();
    }

    /**
     * Attach tags to the model
     */
    public function attachTags($tags): void
    {
        $tagIds = $this->resolveTagIds($tags);
        $this->tags()->syncWithoutDetaching($tagIds);
    }

    /**
     * Detach tags from the model
     */
    public function detachTags($tags): void
    {
        $tagIds = $this->resolveTagIds($tags);
        $this->tags()->detach($tagIds);
    }

    /**
     * Sync tags for the model
     */
    public function syncTags($tags): void
    {
        $tagIds = $this->resolveTagIds($tags);
        $this->tags()->sync($tagIds);
    }

    /**
     * Check if model has a specific tag
     */
    public function hasTag($tag): bool
    {
        $tagId = $this->resolveTagId($tag);
        return $this->tags()->where('tags.id', $tagId)->exists();
    }

    /**
     * Check if model has any of the given tags
     */
    public function hasAnyTag($tags): bool
    {
        $tagIds = $this->resolveTagIds($tags);
        return $this->tags()->whereIn('tags.id', $tagIds)->exists();
    }

    /**
     * Check if model has all of the given tags
     */
    public function hasAllTags($tags): bool
    {
        $tagIds = $this->resolveTagIds($tags);
        return $this->tags()->whereIn('tags.id', $tagIds)->count() === count($tagIds);
    }

    /**
     * Scope to filter by tag
     */
    public function scopeWithTag($query, $tag)
    {
        $tagId = $this->resolveTagId($tag);

        return $query->whereHas('tags', function ($query) use ($tagId) {
            $query->where('tags.id', $tagId);
        });
    }

    /**
     * Scope to filter by any of the tags
     */
    public function scopeWithAnyTag($query, $tags)
    {
        $tagIds = $this->resolveTagIds($tags);

        return $query->whereHas('tags', function ($query) use ($tagIds) {
            $query->whereIn('tags.id', $tagIds);
        });
    }

    /**
     * Scope to filter by all of the tags
     */
    public function scopeWithAllTags($query, $tags)
    {
        $tagIds = $this->resolveTagIds($tags);

        foreach ($tagIds as $tagId) {
            $query->whereHas('tags', function ($query) use ($tagId) {
                $query->where('tags.id', $tagId);
            });
        }

        return $query;
    }

    /**
     * Resolve tag ID from various input types
     */
    protected function resolveTagId($tag): int
    {
        if (is_numeric($tag)) {
            return (int) $tag;
        }

        if ($tag instanceof Tag) {
            return $tag->id;
        }

        if (is_string($tag)) {
            $found = Tag::where('slug', $tag)->first();
            if ($found) {
                return $found->id;
            }
        }

        throw new \InvalidArgumentException('Invalid tag provided');
    }

    /**
     * Resolve multiple tag IDs from various input types
     */
    protected function resolveTagIds($tags): array
    {
        if (!is_array($tags)) {
            $tags = [$tags];
        }

        return array_map(function ($tag) {
            return $this->resolveTagId($tag);
        }, $tags);
    }
}