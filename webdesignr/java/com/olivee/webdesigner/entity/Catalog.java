package com.olivee.webdesigner.entity;

import java.util.ArrayList;
import java.util.List;

public class Catalog {
	private String id, name, code;
	private List<Catalog> childCatalog = new ArrayList<Catalog>();
	private List<Form> childForm = new ArrayList<Form>();

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public List<Catalog> getChildCatalog() {
		return childCatalog;
	}

	public void setChildCatalog(List<Catalog> childCatalog) {
		this.childCatalog = childCatalog;
	}

	public void addChildCatalog(Catalog catalog) {
		this.getChildCatalog().add(catalog);
	}

	public List<Form> getChildForm() {
		return childForm;
	}

	public void setChildForm(List<Form> childForm) {
		this.childForm = childForm;
	}

	public void addChildForm(Form form) {
		this.getChildForm().add(form);
	}

}
