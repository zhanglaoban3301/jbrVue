import { getRequest } from "./api";

export const initMenu = (router,store)=>{
    if(store.state.routes.length>0){
        return;
    }
  
        getRequest('/menu').then(data =>{
            
            if(data){
                //格式化之后的router
                let fmtRoutes = formatRoutes(data);
                console.log("fmtRoutes",fmtRoutes)
                //添加到路由
                router.addRoutes(fmtRoutes);
                //存入到store中（vuex）
                store.commit('initRoutes',fmtRoutes);
            }
        })
    
}


export const formatRoutes=(routes)=>{
    let fmtRoutes = [];
    routes.forEach(router=>{
        let{
            path,
            component,
            name,
            url,
            iconCls,
            children,
        } = router;
        if(children && children instanceof Array){
            //递归
            children = formatRoutes(children);
        }
        let fmtRouter = {
            path : path,
            name: name,
            url:url,
            iconCls : iconCls,
            children : children,
            component(resolve){
                if(url.startsWith('/home')){
                    require(['../views/'+component+'.vue'],resolve);
                }else if(url.startsWith('/carpetInfo')){
                    require(['../views/carpetInfo/'+component+'.vue'],resolve);
                }else if(url.startsWith('/profit')){
                    require(['../views/profit/'+component+'.vue'],resolve);
                }else if(url.startsWith('/system')){
                    require(['../views/system/'+component+'.vue'],resolve);
                }else if(url.startsWith('/carpetShow')){
                    require(['../views/carpetShow/'+component+'.vue'],resolve);
                }
            }
        }
        fmtRoutes.push(fmtRouter);
    });
    return fmtRoutes;
}