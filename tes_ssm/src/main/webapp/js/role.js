//@ sourceURL=role.js
$(function() {
	//sidebar上的超链接点击后的默认展示的页面
	findRoleByPage(1);

	//新增角色
	$("#addPanel button[type=submit]").click(function() {
		return addRole();
	})
	
	//按照角色名模糊搜索
	$("#roleSearch").click(function() {		
		return findRoleByPage(1);
	})
	
	//编辑角色名
	
	//模态框获取对应的角色名
	$()
	
	$("#editRole button[type=submit]").click(function() {
		
	})
	//删除角色
})

//页面展示函数
function findRoleByPage(currentPage) {
	//搜索role关键字
	var roleKW=$("#rolePanel .row input[type='text']").val();
	if (roleKW=="") {
		roleKW="undefined"
	}

	$.ajax({
		url:basePath+"role/findRoleByPage",
		type:"get",
		data:{
			"currentPage":currentPage,
			"roleKW":roleKW			
		},
		dataTybe:"json",
		success:function(result){

			var page=result.data;

			var roles=page.roles;

			var nums=page.nums;

			//清空表格
			$("#rolePanel tbody").html("");
			$(roles).each(function(index,role) {
				if (role.name!="超级管理员"&&role.name!="讲师"&&role.name!="学生") {
					var tr1='<tr>'+
					'<td>'+(index+1)+'</td>'+
					'<td>'+role.id+'</td>'+
					'<td>'+role.name+'</td>'+
					'<td>'+
					'</td>'+
					'</tr>'; 

					$("#rolePanel tbody").append(tr1);
				}else {
					var tr2='<tr>'+
					'<td>'+(index+1)+'</td>'+
					'<td>'+role.id+'</td>'+
					'<td>'+role.name+'</td>'+
					'<td>'+
					'<a    href="" onclick="updateRole(\''+role.id+'\',\''+role.name+'\')"  data-toggle="modal" data-target="#editRole" ><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>编辑</a>'+
					'<a    href="" data-toggle="modal" data-target=".bs-example-modal-sm"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除</a>'+
					'</td>'+
					'</tr>';  
					$("#rolePanel tbody").append(tr2);

				}  			

			})

			//清空分页条			
			$("#role_pagination").html("");

			if (page.totalPages>1) {		
				var prePage='<li>'+
				'<a href="javascript:findRoleByPage('+page.previousPage+')" aria-label="Previous">'+
				'<span aria-hidden="true">&laquo;</span>'+
				'</a>'+
				'</li>';
				$("#role_pagination").append(prePage);



				$(page.nums).each(function(n,value){	

					var midPage='<li><a href="javascript:findRoleByPage('+value+')">'+value+'</a></li>';
					$("#role_pagination").append(midPage);
				})

				var nextPage=
					'<li>'+
					'<a href="javascript:findRoleByPage('+page.nextPage+')" aria-label="Next">'+
					'<span aria-hidden="true">&raquo;</span>'+
					'</a>'+
					'</li>';
				$("#role_pagination").append(nextPage);				
			}			

		},
		error:function(){
			alert("请求失败");
		}		
	})
}
function addRole() {
	var roleName=$("#addRoleName").val();	
	if (!roleName) {
		//提示角色名为空
		alert("角色名称为空");
		//返回页面至列表页面
		return false;

	}
	//异步提交数据
	$.ajax({
		url:basePath+"role/addRole",
		type:"post",
		dataType:"json",
		data:{
			"name":roleName
		},
		success:function(result){
			alert("添加函数");
		},	
		error:function(){
			alert("角色添加请求失败");
		}		
	})
	return false;	
}
