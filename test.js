// 启动秘乐短视频
var aName = "秘乐短视频";
app.launchApp(aName);
// 在无障碍服务启动后继续运行。
auto.waitFor();

// log("hello autojs");
// log("activity name:" + currentActivity());
// log("package name: " + app.getPackageName(aName));

/*
activity name:   com.tencent.mm.ui.LauncherUI
activity name:   com.milecn.modulemain.MainActivity
package name:    com.milecn.milevideo
*/

var hb = text("首页").findOne().bounds();
click(hb.centerX(), hb.centerY());
