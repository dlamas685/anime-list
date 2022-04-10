export interface Data {
    Page: Page;
    Media: Media;
}

export interface Page {
    media:    Media[];
}

export interface Filter {
    title?: string | null;
    genre?: string | null;
    seasonYear?: number | string | null;
    format?: MediaFormat | null;
    type?: MediaType | null;
}

export enum MediaFormat {
    TV = 'TV', 
    MOVIE = 'MOVIE', 
    TV_SHORT = 'TV_SHORT', 
    SPECIAL = 'SPECIAL', 
    OVA = 'OVA', 
    ONA = 'ONA', 
    MUSIC = 'MUSIC',
    VACIO = ''
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
    format:          MediaFormat;
    tags:            Tag[];
    status:          MediaStatus;
    popularity:       number;
    isAdult:         boolean;
    type:            MediaType;
    isFavorite:      boolean;
    trailer:         MediaTrailer;
}

export enum MediaStatus {
    FINISHED = 'FINISHED',
    RELEASING = 'RELEASING',
    NOT_YET_RELEASED = 'NOT_YET_RELEASED',
    CANCELLED = 'CANCELLED',
    HIATUS = 'HIATUS'
}

export enum MediaSort {
    ID = 'ID',
    ID_DESC = 'ID_DESC',
    TITLE_ROMAJI = 'TITLE_ROMAJI',
    TITLE_ROMAJI_DESC = 'TITLE_ROMAJI_DESC',
    POPULARITY = 'POPULARITY',
    POPULARITY_DESC = 'POPULARITY_DESC'
}

export interface MediaTrailer {
    id: string;
}

export interface CoverImage {
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
    romaji:        string;
    userPreferred: string;
    english:       null | string;
    native:        string;
}

