angular.module('tusimpleFileUpload', [])
    .directive('tusimpleFileUpload', ['$http', function($http) {
        return {
            template: '<div class="tusimple-file-upload" ><div class="file-input-area"><p class="file-tip file-mask">点击或拖放传图</p><input type="file" class="file-input"></div><div class="file-display-area"><div class="file-info file-mask"></div></div></div>',
            replace: true,
            scope: {
                imgData: '='
            },
            transclude: false,
            link: function(scope, ele, attrs, controller) {

                var input = ele.find('input');
                var mask = angular.element(ele[0].getElementsByClassName('file-mask'));
                var fileInputArea = angular.element(ele[0].getElementsByClassName('file-input-area'));
                var fileDisplayArea = angular.element(ele[0].getElementsByClassName('file-display-area'));
                var tip = angular.element(ele[0].getElementsByClassName('file-tip'));
                var info = angular.element(ele[0].getElementsByClassName('file-info'));


                mask.css('line-height',ele[0].offsetHeight+'px');


                input[0].ondragover = function () {
                    tip.text('松开鼠标');
                    fileInputArea.addClass('file-input-area-ondrag');
                };
                input[0].ondragleave = function () {
                    tip.text('点击或拖放传图');
                    fileInputArea.removeClass('file-input-area-ondrag');
                };
                input[0].ondrop = function () {
                    tip.text('点击或拖放传图');
                    fileInputArea.removeClass('file-input-area-ondrag');
                };
                console.log(ele[0]);
                console.log(ele);
                input.bind('change', function(e) {
                    var form = new FormData();
                    //上传
                    var file = e.target.files[0];
                    console.log(file);
                    if (navigator.userAgent.indexOf("MSIE")>=1) { // IE 
                        fileDisplayArea.css('background-image','url('+ file.value+')');
                    }else{
                        fileDisplayArea.css('background-image','url('+ window.URL.createObjectURL(file)+')');
                    }
                    if (file === undefined) { //没选择文件
                        return false;
                    }
                    form.append("file", file);
                    
                    info.removeClass('file-info-fail file-info-success');
                    info.addClass('file-info-in');
                    info.text('上传中...');
                    $http.post(attrs.targetUrl, form, {
                        headers: {
                            'Content-Type': undefined
                        }
                    }).then(function(data) {
                        console.info('Image uploaded successfully!' + data.data);
                        info.removeClass('file-info-in file-info-fail');
                        info.addClass('file-info-success');
                        info.text('上传成功！');
                        scope.imgData = data;
                    },function (data) {
                        info.removeClass('file-info-in file-info-success');
                        info.addClass('file-info-fail');
                        info.text('上传失败！');
                    },function (data) {
                    });
                });
            }
        };
    }]);