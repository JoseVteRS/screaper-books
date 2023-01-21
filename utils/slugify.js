import urlSlug from 'url-slug';

export function slugify(text) {
    if (typeof text !== 'string') throw new Error(`${text} must be a string`);
    return urlSlug(text);
}