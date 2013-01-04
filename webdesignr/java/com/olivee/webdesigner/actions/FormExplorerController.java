package com.olivee.webdesigner.actions;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.olivee.webdesigner.entity.Catalog;



@Controller
public class FormExplorerController {
	
	@RequestMapping("/form/catalog/list")
	@ResponseBody
	public Catalog getDetail(@RequestParam("catalogId") String catalogId) {
		return new Catalog();
	}
	
}
