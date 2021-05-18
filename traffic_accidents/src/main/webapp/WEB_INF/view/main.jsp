<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt"    uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn"     uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Solution Developer</title>
</head>
<body>
    <img src="springlogo.png" width="200" height="200" alt="index img">
    <h1>Hello, gethlemn!</h1>
    <ul>
        <c:forEach items="${result}" var="accidentList">
            <li>${accidentList.violtCn}</li>
        </c:forEach>
    </ul>
</body>
</html>
