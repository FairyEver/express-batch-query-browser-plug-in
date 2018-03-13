export default `

<div class="x">
    <div class="x-header">
        批量操作 | 当前状态：
        <span id="log">就绪</span>
        <span class="toggle" id="panelToggleBtn">隐藏</span>
    </div>
    <div class="x-body" id="panel">
        <div class="uploader-group">
            选择单号文件 <input type="file" id="uploader">
        </div>
        <div id="control" style="display: block;">
            <button id="startButton" type="button" class="btn btn-x">开始</button>
            <button id="downloadButton" type="button" class="btn btn-x">下载结果</button>
        </div>
    </div>
</div>

`.trim()