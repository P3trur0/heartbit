package io.hackitaly;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.JsonPrimitive;
import com.mashape.unicorn.http.Unicorn;
import com.mashape.unicorn.request.HttpRequest;

@SuppressWarnings("serial")
public class HackItalyServlet extends HttpServlet {

	private JsonArray listOfTags;
	private JsonArray listOfUrls;
	
	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		response.setContentType("application/json");
		
		listOfTags = new JsonArray();
		// Get the printwriter object from response to write the required json object to the output stream      
		PrintWriter out = response.getWriter();
		// Assuming your json object is **jsonObject**, perform the following, it will return your json object  

		JsonObject jsonObject;
		try {
			String tag = (String) request.getParameter("tag");
			Boolean searchSongs = new Boolean(request.getParameter("searchSongs"));
			
			String [] tags = tag.split("\\s+");
			
			int random = 0 + (int)(Math.random()*(tags.length-1)); 
			
			jsonObject = this.invokeInstagram(tags[random]);
			
			if(jsonObject!=null) {
				this.manageInstagramResponse(jsonObject);
				
				JsonObject jselem = new JsonObject();
				jselem.add("images", listOfUrls);
				jselem.add("tags", listOfTags);
				if(searchSongs==true)
					jselem.add("tracks", App.getIdJsonArray(tag));
				out.print(jselem);
				out.flush();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}


	private void manageInstagramResponse(JsonObject jsonObject) {
		
		//JsonArray tags = new JsonArray();
		listOfUrls = new JsonArray();
		// TODO Auto-generated method stub
		JsonArray elements = jsonObject.getAsJsonArray("data");
		
		Iterator<JsonElement> elems = elements.iterator();
		
		int size = elements.size();
		
		while(elems.hasNext()) {
			JsonObject elem = (JsonObject)elems.next();
			this.getListOfTags(elem.getAsJsonArray("tags"));
			
			JsonObject image = (JsonObject) elem.get("images");
			JsonObject std_res =  (JsonObject) image.get("standard_resolution");
			
			JsonPrimitive imgUrl = (JsonPrimitive) std_res.get("url");
			listOfUrls.add(imgUrl);
		}
	}
	
	
	private void getListOfTags(JsonArray tags) {
		Iterator<JsonElement> elementsTags = tags.iterator();
		
		while(elementsTags.hasNext()) {
			JsonPrimitive singleTag = (JsonPrimitive)elementsTags.next();
			listOfTags.add(singleTag);
		}
	}

	private JsonObject invokeInstagram(String tag) {
		HttpClient hc = new DefaultHttpClient();
		HttpGet get = new HttpGet("https://api.instagram.com/v1/tags/"+tag+"/media/recent?client_id=HERE_GOES_CLIENT_ID");
		try {
			HttpResponse resp = hc.execute(get);
			String response = EntityUtils.toString(resp.getEntity(), "UTF-8");
			
			JsonParser parser = new JsonParser();
			JsonObject o = (JsonObject)parser.parse(response);
			return o;
		} catch (ClientProtocolException e) {
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	

//main method removed
}
