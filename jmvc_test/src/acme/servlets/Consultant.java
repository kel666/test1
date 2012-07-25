package acme.servlets;

import java.io.*;
import java.net.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;

import acme.AcmeUtils;

import com.google.gson.*;

/**
 * Servlet implementation class Consultant
 */
public class Consultant extends HttpServlet {
	
	protected static List<acme.beans.Consultant> cons=null;
	protected static int lastid;

	protected static void build() {
		//
		cons=new Vector<acme.beans.Consultant>();
		acme.beans.Consultant c1=new acme.beans.Consultant();
		c1.setId(1);
		c1.setName("Pinco");
		c1.setLname("Pallino");
		c1.setFc("PPL123CVB");
		cons.add(c1);
		acme.beans.Consultant c2=new acme.beans.Consultant();
		c2.setId(2);
		c2.setName("Paolino");
		c2.setLname("Paperino");
		c2.setFc("PAOPAP456");
		cons.add(c2);
		acme.beans.Consultant c3=new acme.beans.Consultant();
		c3.setId(3);
		c3.setName("Paolo");
		c3.setLname("Rossi");
		c3.setFc("PAOROS333");
		cons.add(c3);
		acme.beans.Consultant c4=new acme.beans.Consultant();
		c4.setId(4);
		c4.setName("Dante");
		c4.setLname("Alighieri");
		c4.setFc("DANALI848");
		cons.add(c4);
		acme.beans.Consultant c5=new acme.beans.Consultant();
		c5.setId(5);
		c5.setName("Alessandro");
		c5.setLname("Manzoni");
		c5.setFc("ALEMAN555");
		cons.add(c5);
		lastid=5;

		Contracts.build();
		Vector<acme.beans.Contract> co1=new Vector<acme.beans.Contract>();
		co1.add(Contracts.conts.get(0));
		co1.add(Contracts.conts.get(1));
		c2.setConts(co1);
		co1=new Vector<acme.beans.Contract>();
		co1.add(Contracts.conts.get(2));
		c3.setConts(co1);
		co1=new Vector<acme.beans.Contract>();
		co1.add(Contracts.conts.get(3));
		c4.setConts(co1);
	}

	@Override
	public void init(ServletConfig config) throws ServletException {
		// TODO Auto-generated method stub
		super.init(config);
		if (cons==null) build();
	}

	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
		int id=new Integer(req.getParameter("id"));
		int ix=indexOf(new Integer(id));
		if (ix!=-1)
			cons.remove(ix);
	}

	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
		response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
		Gson g=new Gson();
		String id=request.getParameter("id");
		// 
		int ix=-1;
		if (id!=null) ix=indexOf(new Integer(id));
		//
		int pageSize=4;
		if (request.getParameter("pageSize")!=null)
			pageSize=new Integer(request.getParameter("pageSize"));
		int page=1;
		if (request.getParameter("page")!=null)
			page=new Integer(request.getParameter("page"));
		//
		ServletOutputStream out=response.getOutputStream();
		if (request.getParameter("all")!=null) 
			out.print(g.toJson(getPage(cons, page, pageSize)));
		else
		if (id!=null) {
			if (ix!=-1) out.print(g.toJson(cons.get(ix)));
		} else {
			String field=request.getParameter("field");
			String val=request.getParameter("val");
			List<acme.beans.Consultant> src=new Vector<acme.beans.Consultant>();
			for(int i=0; i<cons.size(); i++) {
				if ((field.equals("name"))&&(cons.get(i).getName().toLowerCase().contains(val.toLowerCase())))
					src.add(cons.get(i));
				if ((field.equals("lname"))&&(cons.get(i).getLname().toLowerCase().contains(val.toLowerCase())))
					src.add(cons.get(i));
				if ((field.equals("fc"))&&(cons.get(i).getFc().toLowerCase().contains(val.toLowerCase())))
					src.add(cons.get(i));
			}
			out.print(g.toJson(getPage(src, page, pageSize)));
		}
		
		out.close();
	}
	
	private List<acme.beans.Consultant> getPage(List<acme.beans.Consultant> data, int page, int pageSize) {
		List<acme.beans.Consultant> ret=new Vector<acme.beans.Consultant>();
		int from=(page-1)*pageSize;
		int to=data.size();
		if (from+pageSize<to) to=from+pageSize;
		for(int r=from; r<to; r++) {
			if (r+1==data.size()) data.get(r).setLastRecord(true);
			ret.add(data.get(r));
		}
		return ret;
	}
	
	protected static int indexOf(int id) {
		int ix=-1;
		for(int i=0; i<cons.size(); i++)
			if (cons.get(i).getId()==new Integer(id))
				ix=i;
		return ix;
	}

	@Override
	protected void doPut(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
		int id=new Integer(req.getParameter("id"));
		int ix=indexOf(new Integer(id));
		if (ix!=-1) {
			Map<String, String[]> map=AcmeUtils.parseRequest(req);
			// get body
			String name=(map.get("name"))[0];
			String lname=(map.get("lname"))[0];
			String fc=(map.get("fc"))[0];
			acme.beans.Consultant c=cons.get(ix);
			c.setFc(fc);
			c.setLname(lname);
			c.setName(name);
			for(int i=0; i<c.getConts().size(); i++)
				c.getConts().get(i).setConsultantName(name+" "+lname);
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
		String name=request.getParameter("name");
		String lname=request.getParameter("lname");
		String fc=request.getParameter("fc");
		Gson g=new Gson();
		acme.beans.Consultant c=new acme.beans.Consultant(); 
		c.setName(name);
		c.setLname(lname);
		c.setFc(fc);
		lastid++;
		c.setId(lastid);
		cons.add(c);
		ServletOutputStream out=response.getOutputStream();
		out.print(g.toJson(c));
		out.close();
	}

	
	
	public static void copyStream(InputStream in, OutputStream out)
			throws IOException {

		// Transfer bytes from in to out
		byte[] buf = new byte[1024];
		int len;
		while ((len = in.read(buf)) > 0) {
			out.write(buf, 0, len);
		}
		in.close();
		out.flush();
		out.close();
	}
	
	@Override
	protected void doOptions(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
		resp.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
	}
	

}
