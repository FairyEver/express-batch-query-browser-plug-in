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
                <label class="custom-file-label" for="uploader">选择单号列表</label>
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
        <div id="control" style="display: block;">
            <button id="startButton" type="button" class="btn btn-primary">开始</button>
            <button id="downloadButton" type="button" class="btn btn-primary">下载结果</button>
        </div>
    </div>
</div>

`.trim()