package acme.beans;

import java.util.*;

public class Consultant {
	private int id;
	private String name;
	private String lname;
	private String fc;
	private List<Contract> conts=new Vector<Contract>();
	private boolean lastRecord=false;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getFc() {
		return fc;
	}
	public void setFc(String fc) {
		this.fc = fc;
	}
	public String getLname() {
		return lname;
	}
	public void setLname(String lname) {
		this.lname = lname;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public boolean isLastRecord() {
		return lastRecord;
	}
	public void setLastRecord(boolean lastRecord) {
		this.lastRecord = lastRecord;
	}
	public List<Contract> getConts() {
		return conts;
	}
	public void setConts(List<Contract> conts) {
		this.conts = conts;
	}
}
