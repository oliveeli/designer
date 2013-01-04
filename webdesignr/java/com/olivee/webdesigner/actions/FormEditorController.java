package com.olivee.webdesigner.actions;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.olivee.webdesigner.entity.Form;


@Controller
public class FormEditorController {

	@RequestMapping("/form/editor/save")
	@ResponseBody
	public Form save(@RequestBody Form from) {
		return new Form();
	}
	
	@RequestMapping("/form/editor/delete")
	@ResponseBody
	public Form delete(@RequestParam("formId") String formId) {
		return new Form();
	}
	
}
