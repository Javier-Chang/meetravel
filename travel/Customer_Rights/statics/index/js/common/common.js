/*
    function name:
            show_alert_from_js
    function:
            從js直接觸發toast，並顯示訊息內容於螢幕頁面右下角。
    input:
            alert_type: (error/info/warning/success/other_words), type:str;
            text: toast內資訊, type:str;
    output:
            顯示toast，根據alert_type顯示不同底色的text內容。
    requirement:
            html頁面必須含有toast，例如:
            <!-- toast 訊息 -->
            <div aria-live="polite" aria-atomic="true" class="position-relative">
                <div id="toast-outer" class="toast-container position-fixed bottom-0 end-0 pb-3" style="z-index: 999;"></div>
            </div>
*/
function show_alert_from_js(alert_type, text) {
    msg = '<div id="toast" class="toast" role="alert" aria-live="assertive" aria-atomic="true" style="width: 500px;">'+
          '<div class="toast-header">'+
          '<i class="fas fa-info"></i>  <strong class="me-auto">系統公告</strong>'+
          '<small class="text-muted">幾秒前</small>'+
          `<p class="toast-time" style="display:none;">${new Date().getTime()}</p>`+
          '<button type="button" class="ms-2 mb-1 close btn-close" data-bs-dismiss="toast" aria-label="Close"></button>'+
          '</div>'
    if (alert_type === "error"){
        msg += `<div class="toast-body alert-danger">${text}</div></div>`
    }
    else if (alert_type === "info"){
        msg += `<div class="toast-body alert-info">${text}</div></div>`
    }
    else if (alert_type === "warning"){
        msg += `<div class="toast-body alert-warning">${text}</div></div>`
    }
    else if (alert_type === "success"){
        msg += `<div class="toast-body alert-success">${text}</div></div>`
    }
    else{
        msg += `<div class="toast-body alert-primary">${text}</div></div>`
    }
    msg_html = $.parseHTML(msg);
    $('#toast-outer').append(msg_html);

    var toastElList = [].slice.call(document.querySelectorAll('.toast'));
    var toastList = toastElList.map(function(toastEl) {
        // Creates an array of toasts (it only initializes them)
      return new bootstrap.Toast(toastEl) // No need for options; use the default options
    });
    var now = new Date().getTime();
    toastList.forEach(function(toast){
        var timestamp = toast._element.querySelector(".toast-time");
        if (timestamp){
            timestamp = timestamp.innerText;
            var diff_time = (now-timestamp) / 1000;
            if (diff_time < 60){
                toast._element.querySelector(".text-muted").innerHTML = parseInt(diff_time) + "秒前";
                toast.show();
            }
            else{
                toast._element.querySelector(".text-muted").innerHTML = "幾分鐘前";
                toast.dispose();
            }
        }
        else{
            toast.dispose();
        }
    });
}

/*
    function name:
            validate_nav
    function:
            驗證NAV表單，主要用於checkout.html頁面的多位乘客，僅檢查表格是否有輸入。
    input:
            form_id: 想要驗證的form id, type:str;
    output:
            將錯誤資訊顯示於該field，並且顯示錯誤總數於Nav-tab中。。
    requirement:
            html頁面必須含有class為tab-pane的form，最好要有可以寫入錯誤資訊的div，
            參考\mysite\templates\thsrcholidays\sys\form_checkout_traveler.html，
            範例結構如下:
            <form id="formValidate">
                <div class="nav nav-tabs">    <a id="nav-tab"> NAV名稱 </a>    </div>
                <div class="tab-content">
                    <div class="tab-pane">
                        // 非radio
                        <div>
                            <div><input>欄位</div>
                            <div style="color:red;">錯誤訊息</div>
                        </div>
                        // radio
                        <div>
                            <label><input type="radio" name="same">radio1</label>
                            <label><input type="radio" name="same">radio2</label>
                            <div style="color:red;">錯誤訊息</div>
                        </div>
                    </div>
                </div>
            </form>
*/
function validate_nav(form_id){
    var nav_form = document.getElementById(form_id);
    //  抓表單內全部nav panel的內容
    var navs = nav_form.querySelectorAll(".tab-pane");
    //  驗證失敗要切換的表單
    var change_tab = null;
    var nav_place = null;
    //  掃描全部的nav，紀錄驗證失敗的nav_id、數量
    for (var nav of navs){
        var form_in_nav = nav.querySelectorAll("input");
        //  紀錄總共的驗證失敗數量
        var count = 0;
        var radio_field_name = "";
        //  掃描並驗證全部的nav中的input
        for (var field of form_in_nav){

            var error_div = field.parentNode.parentNode.querySelectorAll("div")[1];
            //  特別處理radio，因為結構不同
            if (field.type === "radio") {
                //  如果是已經記錄過的radio，就不需要再檢測，未紀錄的則需要做檢查
                if (radio_field_name === field.name){
                    break;
                }
                else{
                    radio_field_name = field.name;
                    var error_div = field.parentNode.parentNode.parentNode.querySelectorAll("div")[1];
                }
            }

            if (error_div){
                //  input驗證失敗的話，數量+1、將頁面拉到nav的所在位置，並寫入錯誤資訊到error area中
                if (!field.validity.valid){
                    nav_place = nav.id;
                    if (field.validity.valueMissing){
                        error_div.innerHTML = "請填入資訊";
                    }
                    else{
                        error_div.innerHTML = "驗證有錯誤，請檢查";
                    }
                    error_div.setAttribute("name", "pre-check");
                }
                else if (error_div.hasAttribute("name")){
                    error_div.innerHTML = "";
                    error_div.removeAttribute("name");
                }
                // 檢查error_div 不為空值，則總數量+1
                if (error_div.innerHTML !== ""){
                    count ++;
                }
            }
        }
        //  抓取每個nav的 title list
        var nav_item = nav_form.querySelector(`a[aria-controls=${nav.id}]`);
        //  移動至nav的error高度
        if (nav_place){
            $('html, body').animate({
                scrollTop: $("#"+nav_place).offset().top
            }, 100);
        }
        //  記錄當下所在的頁面
        if (nav_item.ariaSelected){
            var active_tab_id = nav_item.id;
        }
        //  nav的title要寫入錯誤總數，將該title存在變數中
        var item_sapn = nav_item.querySelector("span");
        //  總數>0: 該pane中有錯誤發生需做處理；如果沒有，則確認是否有舊的總數，並將其刪除
        if (count>0){
            //  確認是否有舊的總數，有的畫更新總數量，沒有的話則新增新的span並寫入總數
            if (item_sapn){
                item_sapn.innerHTML = count;
            }
            else{
                var i = document.createElement('span');
                i.setAttribute("class", "badge bg-secondary");
                i.innerHTML = count;
                nav_item.appendChild(i)
            }
            //  紀錄驗證失敗要切換的表單
            change_tab = nav.id;
        }
        else{
            if (item_sapn){
                nav_item.removeChild(item_sapn);
            }
        }
    }
    //  如果最後一個發生錯誤的nav_tab與目前的不同，則切換nav_tab
    if (change_tab && (active_tab_id !== change_tab) ){
        $(`a[aria-controls=${change_tab}]`).tab('show');
        if (nav_form.querySelector(".tab-H-scrollbar")){
            var left = $('.tab-H-scrollbar').width();
            $('#nav-tab').scrollLeft(left);
        }
    }
}