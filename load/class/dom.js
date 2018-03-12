export default `

<div class="x">
    <div class="x-header">
        批量操作
        <span class="toggle" id="panelToggleBtn">隐藏</span>
    </div>
    <div class="x-body" id="panel">
        <div class="input-group mb-3">
            <div class="custom-file">
                <input type="file" class="custom-file-input" id="uploader">
                <label class="custom-file-label" for="uploader">载入 .xlsx 文件</label>
            </div>
        </div>
        <div id="progress">
            <p id="progress-title">进度</p>
            <div class="progress mb-3">
                <div
                    id="progress-bar"
                    class="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    aria-valuenow="0"
                    aria-valuemin="0"
                    aria-valuemax="0"
                    style="width: 0%">
                </div>
            </div>
            <div id="control-panel">
                <button id="control-startButton" type="button" class="btn btn-light">开始</button>
            </div>
        </div>
    </div>
</div>

`.trim()