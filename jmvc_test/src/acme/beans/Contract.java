package acme.beans;

import java.util.*;

public class Contract {
	private String id;
	private long date;
	private String customer;
	private int consultantId;
	private String consultantName="";
	private transient Consultant consultant;
	private boolean lastRecord=false;
	
	public long getDate() {
		return date;
	}
	public void setDate(long date) {
		this.date = date;
	}
	public String getCustomer() {
		return customer;
	}
	public void setCustomer(String customer) {
		this.customer = customer;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Consultant getConsultant() {
		return consultant;
	}
	public void setConsultant(Consultant consultant) {
		this.consultant = consultant;
		this.consultantId = consultant.getId();
		this.setConsultantName(consultant.getName()+" "+consultant.getLname());
	}
	public boolean isLastRecord() {
		return lastRecord;
	}
	public void setLastRecord(boolean lastRecord) {
		this.lastRecord = lastRecord;
	}
	public int getConsultantId() {
		return consultantId;
	}
	public String getConsultantName() {
		return consultantName;
	}
	public void setConsultantName(String consultantName) {
		this.consultantName = consultantName;
	}
}
