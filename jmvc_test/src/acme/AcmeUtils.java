package acme;

import java.io.IOException;
import java.io.InputStream;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.StringTokenizer;
import javax.servlet.http.HttpServletRequest;

public abstract class AcmeUtils {
	public static Map<String, String[]> parseRequest(HttpServletRequest req) throws IOException {
	    byte[] data = new byte[req.getContentLength()];
	    int len = 0, totalLen = 0;
	    InputStream is = req.getInputStream();
	    while(totalLen < data.length) {
	        totalLen += (len = is.read(data, totalLen, data.length - totalLen));
	        if(len < 1)
	            throw new IOException("Cannot read more than " + totalLen + (totalLen == 1 ? " byte!" : " bytes!"));
	    }
	    String enc = req.getCharacterEncoding();
	    if(enc == null)
	        enc = "UTF-8";
	    String s = new String(data, enc), name, value;
	    StringTokenizer st = new StringTokenizer(s, "&");
	    int i;
	    HashMap<String, LinkedList<String>> mapA = new HashMap<String, LinkedList<String>>(data.length * 2);
	    LinkedList<String> list;
	    boolean decode = req.getContentType() != null && req.getContentType().contains("application/x-www-form-urlencoded");
	    while(st.hasMoreTokens()) {
	        s = st.nextToken();
	        i = s.indexOf("=");
	        if(i > 0 && s.length() > i + 1) {
	            name = s.substring(0, i);
	            value = s.substring(i+1);
	            if(decode) {
	                try {
	                    name = URLDecoder.decode(name, "UTF-8");
	                } catch(Exception e) {}
	                try {
	                    value = URLDecoder.decode(value, "UTF-8");
	                } catch(Exception e) {}
	            }
	            list = mapA.get(name);
	            if(list == null) {
	                list = new LinkedList<String>();
	                mapA.put(name, list);
	            }
	            list.add(value);
	        }
	    }
	    HashMap<String, String[]> map = new HashMap<String, String[]>(mapA.size() * 2);
	    for(String key : mapA.keySet()) {
	        list = mapA.get(key);
	        map.put(key, list.toArray(new String[list.size()]));
	    }
	    return map;
	}
}
