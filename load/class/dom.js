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
        <div id="progress" style="display: none;">
            <p id="progressTitle">进度</p>
            <div class="progress mb-3">
                <div
                    id="progressBar"
                    class="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    style="width: 0%">
                </div>
            </div>
        </div>
        <div id="control" style="display: none;">
            <button id="startButton" type="button" class="btn btn-light">开始</button>
        </div>
    </div>
</div>

`.trim()