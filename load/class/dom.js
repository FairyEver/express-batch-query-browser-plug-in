export default `

<div class="x">
    <div class="hello">你好，你的页面变了，这是因为插件做了一些工作</div>
    <div class="x-header">
        批量操作 | 当前状态：
        <span id="log">等待载入单号</span>
        <span class="toggle" id="panelToggleBtn">隐藏</span>
    </div>
    <div class="x-body" id="panel">
        <div class="uploader-group" style="display: none;">
            选择单号文件 <input type="file" id="uploader">
        </div>
        <div class="uploader-textarea-group">
            <div>在这里粘贴单号，多个单号换行分割，不限制数量，然后点击下面的导入按钮</div>
            <textarea id="uploaderTextarea"></textarea>
            <div>
                <button id="uploaderTextareaOkBtn">导入</button>
            </div>
        </div>
        <div id="control">
            <button id="helpButton" type="button" class="btn btn-x">如何使用</button>
            <button id="startButton" type="button" class="btn btn-x">开始</button>
            <button id="pauseButton" type="button" class="btn btn-x">暂停</button>
            <button id="goonButton" type="button" class="btn btn-x">继续</button>
            <button id="downloadButton" type="button" class="btn btn-x">下载结果</button>
        </div>
    </div>
</div>

`.trim()