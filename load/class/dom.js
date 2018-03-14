export default `

<div class="x">
    <div class="hello">你好，你的页面变了，这是因为插件做了一些工作 [0.0.2]</div>
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
                <button id="uploaderTextareaOkBtn" class="btn-x">导入</button>
            </div>
        </div>
        <div class="setting-group">
            <div class="setting-item">
                <label>请求凭证等待时间(秒)</label>
                <input id="ticketWait" type="text" value="2">
            </div>
            <div class="setting-item">
                <label>请求数据等待时间(秒)</label>
                <input id="getDataWait" type="text" value="2">
            </div>
            <div class="setting-item">
                <label>请求凭证最大尝试次数</label>
                <input id="ticketMaxTry" type="text" value="10">
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