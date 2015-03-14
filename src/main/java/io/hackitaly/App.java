package io.hackitaly;
 
import io.hackitaly.bean.TrackDeezer;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Iterator;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.jmusixmatch.MusixMatch;
import org.jmusixmatch.MusixMatchException;
import org.jmusixmatch.entity.track.Track;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.JsonPrimitive;
 
 
/**
 * Hello world!
 *
 */
public class App 
{
     
    public static void main( String[] args )
    {
        String toSearch="cuore";
        getIdJsonArray(toSearch);
    }
     
    public static ArrayList<TrackDeezer> getTrackList(String toSearch) {
         
        ArrayList<TrackDeezer> DZTracks=new ArrayList<TrackDeezer>();
        ArrayList<Track> tracks=new ArrayList<Track>();
        ArrayList<Integer> tracksDezeerIDs= new ArrayList<Integer>();
        MusixMatch mm=new MusixMatch("fd38745933c0390c6be67beeb6195a82");
        String artist="";
        JsonObject JO=null, innerObject=null;
        Iterator it=null;
        int id;
        try {
            tracks=(ArrayList<Track>) mm.searchTracks(toSearch, "", "", 0, 20, false);
        } catch (MusixMatchException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        System.out.println(tracks.size());
  
        for (Track track : tracks) {
            String title=track.getTrack().getTrackName();
            String artista=track.getTrack().getArtistName();
            try {
                JO=JsonObjectSong(java.net.URLEncoder.encode(title+"%20"+artista, "UTF-8").replace("+", "%20"));
                JsonArray array=JO.getAsJsonArray("data");
                it=(Iterator) array.iterator();
                while(it.hasNext()){
                    innerObject=(JsonObject) it.next();
                    id=innerObject.get("id").getAsInt();
                    artist=innerObject.getAsJsonObject("artist").get("name").getAsString();
                    TrackDeezer tz=new TrackDeezer(id, title, artist);
                    boolean add=true;
                    for (TrackDeezer dezeerTrack : DZTracks) {
                        if(dezeerTrack.compareTo(tz)==0)  {
                            add=false;
                        }
                    }
                    if(add) DZTracks.add(tz);
                    tracksDezeerIDs.add(id);
                }
 
                 
//              for (TrackDeezer dezeerTrack : DZTracks) {
//                  System.out.println("Artista: "+dezeerTrack.getArtist());
//                  System.out.println("Titolo: "+dezeerTrack.getTitle());
//                  System.out.println("ID: "+dezeerTrack.getId());
//              }
                 
            } catch (UnsupportedEncodingException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        System.out.println("NUMERO CANZONI:"+DZTracks.size());      
        return DZTracks;
    }
     
    public static JsonArray getIdJsonArray(String toSearch) {
        ArrayList<TrackDeezer> DZTracks=getTrackList(toSearch);
        JsonArray ja=new JsonArray();
         
        for (TrackDeezer track : DZTracks) {
            JsonElement id=new JsonPrimitive(track.getId());
            ja.add(id);   
        }
         
        System.out.println(ja);
        return ja;
         
    }
     
     
    private static JsonObject JsonObjectSong(String toSearch) {
        HttpClient hc=new DefaultHttpClient();
        System.out.println("Cerco: "+toSearch);
        HttpGet get= new HttpGet("http://api.deezer.com/2.0/search/track?q="+toSearch);
        try {
            HttpResponse resp=hc.execute(get);
            String response = EntityUtils.toString(resp.getEntity(), "UTF-8");
             
            JsonParser parser= new JsonParser();
            JsonObject o=(JsonObject)parser.parse(response);
            return o;
        } catch(ClientProtocolException e) {
            e.printStackTrace();
            return null;
        } catch(IOException e) {
            e.printStackTrace();
            return null;
        }
         
    }
}