package io.hackitaly.jmusixmatch.entity.lyrics.get;

import com.google.gson.annotations.SerializedName;

import io.hackitaly.jmusixmatch.entity.lyrics.Lyrics;

public class LyricsGetBody {
	
    @SerializedName("lyrics")
    private Lyrics lyrics;

    public void setLyrics(Lyrics lyrics) {
        this.lyrics = lyrics;
    }

    public Lyrics getLyrics() {
        return lyrics;
    }
}
