package io.hackitaly.bean;


public class TrackDeezer implements Comparable {

	int id;
	String title, artist;

	
	public TrackDeezer(int id, String title, String artist) {
		super();
		this.id = id;
		this.title = title;
		this.artist = artist;
	}


	public String getArtist() {
		return artist;
	}


	public void setArtist(String artist) {
		this.artist = artist;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}


	public int compareTo(Object arg0) {
		// TODO Auto-generated method stub
		TrackDeezer t=(TrackDeezer) arg0;
		if(this.title.toLowerCase().equals(t.title.toLowerCase()) && this.artist.toLowerCase().equals(t.artist.toLowerCase())) return 0;
		else return 1;
	}
	
	
}
