package acme.servlets;

import java.io.*;
import java.net.*;
import java.text.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;

import acme.AcmeUtils;
import acme.beans.*;
import com.google.gson.*;

/**
 * Servlet implementation class contsultant
 */
public class Contracts extends HttpServlet {
	
	private SimpleDateFormat sdf=new SimpleDateFormat("dd/MM/yyyy");
	protected static List<acme.beans.Contract> conts=null;

	protected static void build() {
		//
		conts=new Vector<acme.beans.Contract>();
		acme.beans.Contract c=new acme.beans.Contract();
		c.setId("CO1");
		c.setCustomer("Huawei");
		c.setDate(System.currentTimeMillis());
		c.setConsultant(Consultant.cons.get(1));
		conts.add(c);
		c=new acme.beans.Contract();
		c.setId("CO2");
		c.setCustomer("IBM");
		c.setDate(System.currentTimeMillis());
		c.setConsultant(Consultant.cons.get(1));
		conts.add(c);
		c=new acme.beans.Contract();
		c.setId("CO3");
		c.setCustomer("Toshiba");
		c.setDate(System.currentTimeMillis());
		c.setConsultant(Consultant.cons.get(2));
		conts.add(c);
		c=new acme.beans.Contract();
		c.setId("CO4");
		c.setCustomer("Nokia");
		c.setDate(System.currentTimeMillis());
		c.setConsultant(Consultant.cons.get(3));
		conts.add(c);
	}
	
	@Override
	public void init(ServletConfig config) throws ServletException {
		// TODO Auto-generated method stub
		super.init(config);
		if (conts==null) Consultant.build();
	}

	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
		String id=req.getParameter("id");
		int ix=indexOf(id);
		if (ix!=-1) {
			// get consultant owning the contract and remove from his list
			List<Contract> conscont=conts.get(ix).getConsultant().getConts();
			for(int i=0; i<conscont.size(); i++)
				if (conscont.get(i).getId().equals(id))
					conscont.remove(i);
			conts.remove(ix);
		}
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
		if (id!=null) ix=indexOf(id);
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
			out.print(g.toJson(getPage(conts, page, pageSize)));
		else
		if (id!=null) {
			if (ix!=-1) out.print(g.toJson(conts.get(ix)));
		} else {
			String field=request.getParameter("field");
			String val=request.getParameter("val");
			List<acme.beans.Contract> src=new Vector<acme.beans.Contract>();
			for(int i=0; i<conts.size(); i++) {
				if ((field.equals("customer"))&&(conts.get(i).getCustomer().toLowerCase().contains(val.toLowerCase())))
					src.add(conts.get(i));
			}
			out.print(g.toJson(getPage(src, page, pageSize)));
		}
		
		out.close();
	}
	
	private List<acme.beans.Contract> getPage(List<acme.beans.Contract> data, int page, int pageSize) {
		List<acme.beans.Contract> ret=new Vector<acme.beans.Contract>();
		int from=(page-1)*pageSize;
		int to=data.size();
		if (from+pageSize<to) to=from+pageSize;
		for(int r=from; r<to; r++) {
			if (r+1==data.size()) data.get(r).setLastRecord(true);
			ret.add(data.get(r));
		}
		return ret;
	}
	
	private int indexOf(String id) {
		int ix=-1;
		for(int i=0; i<conts.size(); i++)
			if (conts.get(i).getId().equals(id))
				ix=i;
		return ix;
	}

	@Override
	protected void doPut(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		resp.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
		String id=req.getParameter("id");
		int ix=indexOf(id);
		if (ix!=-1) {
			Map<String, String[]> map=AcmeUtils.parseRequest(req);
			// get body
			String customer=(map.get("customer"))[0];
			String date_=(map.get("date"))[0];
			long date=new Long(date_);
			int newconsultant=new Integer((map.get("consultantId"))[0]);
			acme.beans.Contract c=conts.get(ix);
			// get consultant owning the contract and remove from his list
			List<Contract> conscont=c.getConsultant().getConts();
			for(int i=0; i<conscont.size(); i++)
				if (conscont.get(i).getId().equals(id))
					conscont.remove(i);
			// retrieve new consultant owner and add contract to his list
			acme.beans.Consultant newcons=Consultant.cons.get(Consultant.indexOf(newconsultant));
			newcons.getConts().add(c);
			c.setCustomer(customer);
			c.setConsultant(newcons);
			c.setDate(date);
			//throw new IOException("pirla");
			Gson g=new Gson();
			ServletOutputStream out=resp.getOutputStream();
			out.print(g.toJson(c));
			out.close();
			/*try {
				c.setDate(sdf.parse(date));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}*/
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
		String customer=request.getParameter("customer");
		String id=request.getParameter("code");
		int consultant=new Integer(request.getParameter("consultantId"));
		String date_=request.getParameter("date");
		long date=new Long(date_);
		Gson g=new Gson();
		acme.beans.Contract c=new acme.beans.Contract();
		c.setId(id);
		c.setCustomer(customer);
		int ix=Consultant.indexOf(consultant);
		c.setConsultant(Consultant.cons.get(ix));
		c.setDate(date);
		conts.add(c);
		Consultant.cons.get(ix).getConts().add(c);
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
