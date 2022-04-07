export interface Data {
    Page: Page;
    Media: Media;
}

export interface Page {
    media:    Media[];
}

export interface Filter {
    title?: string;
    genre?: string;
    seasonYear?: number;
    type?:MediaType;
}

export enum MediaType {
    ANIME = "ANIME",
    MANGA = "MANGA"
}


export interface Media {
    id:              number;
    title:           Title;
    description:     string;
    source:          string;
    season:          null | string;
    genres:          string[];
    seasonYear:      number | null;
    episodes:        number | null;
    bannerImage:     null | string;
    coverImage:      CoverImage;
    countryOfOrigin: string;
    format:          string;
    tags:            Tag[];
    status:          string;
    popularity:       number;
    isAdult:         boolean;
    type:            MediaType;
}

export interface CoverImage {
    id:   number;
    extraLarge: string;
    large:      string;
    medium:     string;
    color:      string;
}

export interface Tag {
    id:   number;
    name: string;
}

export interface Title {
    id:            number;
    romaji:        string;
    userPreferred: string;
    english:       null | string;
    native:        string;
}

