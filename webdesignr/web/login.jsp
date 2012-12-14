<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<title>业务设计器</title>
<link rel="stylesheet" type="text/css" href="css/main.css">
<script src="scripts/lib/require/require.js"></script>
<script src="scripts/require-config.js"></script>
<script>
require([ 'jquery',
    'bootstrap'
], function($) {
    $(function(){
        $('#main-model').modal({backdrop: 'static'});
        $('#main-model').modal('show');
        $('#j_username').focus();
        $('#login').click(function(){
            $('form').submit();
        });
        $('#rest').click(function(){
            $('form').reset();
        });
    });
});
</script>
</head>
<body>
<div id="container">
    <div id="logo">
        <h5>业务设计器</h5>
    </div>
    <div id="menu">


    </div>
    <div id="page">
        <div id="main-model" class="modal hide fade">
            <div class="modal-header">
                <h3>登陆</h3>
            </div>
            <div class="modal-body" style="min-width: 300px; min-height: 300px;">
             
                <c:if test="${not empty error}">
                    <div class="errorblock">
                        登陆失败, 请重试.<br /> 原因 :
                        ${sessionScope["SPRING_SECURITY_LAST_EXCEPTION"].message}
                    </div>
                </c:if>
            
             
                <form name='f' class="form-horizontal login-form" action="<c:url value='j_spring_security_check' />"
                    method='POST'>
                    <div class="control-group">
                        <label class="control-label" for="j_username">用户名：</label>
                        <div class="controls">
							<div class="input-prepend">
							  <span class="add-on"><i class="icon-user"></i></span>
							  <input type="text" id="j_username" name="j_username" placeholder="用户名">
							</div>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="j_password">密码：</label>
                        <div class="controls">
							<div class="input-prepend">
							  <span class="add-on"><i class="icon-certificate"></i></span>
							  <input type="password" id="j_password" name="j_password" placeholder="密码">
							</div>
                        </div>
                    </div>
                    <div class="control-group">
                        <div class="controls">
                            <a class="btn" href="#" id="login">登陆</a>
                            <a class="btn" href="#" id="reset">重置</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div id="footer">
    </div>
</div>

</body>
</html>