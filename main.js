// 启动秘乐短视频
app.launchApp("秘乐短视频");
// 在无障碍服务启动后继续运行。
auto.waitFor();

// name = com.milecn.milevideo
var appPackageName = app.getPackageName("秘乐短视频");

// intoPageByText
function intoPageByText(pageName) {
  var hb = text(pageName).findOne().bounds();
  click(hb.centerX(), hb.centerY());
}

// skipTimerByID 滑动跳过计时器
function skipTimerByID(idNumber) {
  while (id(idNumber).exists()) {
    scrollDown(0);
    sleep(random(3000, 5000));
  }

  toastLog("倒计时刷新视频任务完成！");
}

function main() {
  /**
 *  主逻辑
 * 1. 启动子线程 - 定时检查跳过控件
 * 2. 启动子线程 - 定时检查更新控件
 * 3. 进入首屏，运行任务
 * 4. 完成任务，退出 app
 * 5. 结束所有子线程
 * 6. 退出脚本
 */
  toastLog("等待 app 进入主界面");
  packageName(appPackageName).waitFor();
  // 1. 启动子线程 - 定时检查跳过控件
  var threadCheckSkipTask = threads.start(function () {
    var skip = textContains("跳过");

    setInterval(() => {
      if (skip.exists()) {
        var sb = skip.findOne().bounds();
        click(sb.centerX(), sb.centerY());
      }
    }, 500);
  });
  threadCheckSkipTask.waitFor();

  // 2. 启动子线程 - 定时检查更新控件
  var threadCheckUpdateTask = threads.start(function () {
    var checkUpdate = className("android.widget.TextView").text("直接无视");
    setInterval(() => {
      if (checkUpdate.exists()) {
        checkUpdate.findOne().click();
      }
    }, 500);
  });
  threadCheckUpdateTask.waitFor();

  // 3. 进入首屏，运行任务
  intoPageByText("首页");
  var threadCheckHomePageTask = threads.start(function () {
    var searchButton = id("home_iv_search");
    setInterval(() => {
      if (!searchButton.exists()) {
        intoPageByText("首页");
      }
    }, 1000);
  });
  threadCheckHomePageTask.waitFor();

  // 如果倒计时按钮存在，向上滑动
  skipTimerByID("tv_task_count");

  // 4. 完成任务，退出 app
  if (!id("tv_task_count").exists()) {
    back();
    back();
    toastLog("退出 app 完成！");
  }

  // 5. 结束所有子线程
  threads.shutDownAll();

  // 6. 退出脚本
  exit();
}

main();
