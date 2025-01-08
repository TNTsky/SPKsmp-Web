async function fetchServerStatus(server, type) {
    const url = `https://server-status.2018jacky771122.workers.dev/?server=${server}&type=${type}`;
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${type} server status for ${server}:`, error);
        return null;
    }
}

function updateServerInfo(javaData, beData, serverId) {
    const javaStatusElement = document.getElementById(`${serverId ? serverId + '-' : ''}java-status`);
    const beStatusElement = document.getElementById(`${serverId ? serverId + '-' : ''}be-status`);
    const javaVersionElement = document.getElementById(`${serverId ? serverId + '-' : ''}java-version`);
    const beVersionElement = document.getElementById(`${serverId ? serverId + '-' : ''}be-version`);
    const playersElement = document.getElementById(`${serverId ? serverId + '-' : ''}players`);

    let isJavaOnline = false;

    // 更新 Java 版
    if (javaData && javaData.status === 'online') {
        javaStatusElement.textContent = '在線';
        javaStatusElement.style.color = '#2ecc71';
        javaVersionElement.textContent = javaData.version || 'N/A';
        isJavaOnline = true;
    } else {
        javaStatusElement.textContent = '離線';
        javaStatusElement.style.color = '#e74c3c';
        javaVersionElement.textContent = 'N/A';
    }

    // 如果 Java 離線，強制設置 BE 為離線
    if (!isJavaOnline) {
        beData = null;
    }

    // 更新 BE 版
    if (beData && beData.status === 'online') {
        beStatusElement.textContent = '在線';
        beStatusElement.style.color = '#2ecc71';
        beVersionElement.textContent = beData.version || 'N/A';
    } else {
        beStatusElement.textContent = '離線';
        beStatusElement.style.color = '#e74c3c';
        beVersionElement.textContent = 'N/A';
    }

    // 更新玩家資訊
    if (javaData && javaData.status === 'online') {
        playersElement.textContent = `${javaData.online} / ${javaData.max}　${javaData.delay}ms`;
    } else if (beData && beData.status === 'online') {
        playersElement.textContent = `${beData.online} / ${beData.max}　${beData.delay}ms`;
    } else {
        playersElement.textContent = 'N/A';
    }
}

async function updateAllServers() {
    const [survivalJava, survivalBE, creativeJava, creativeBE] = await Promise.all([
        fetchServerStatus('survival', 'java'),
        fetchServerStatus('survival', 'bedrock'),
        fetchServerStatus('creative', 'java'),
        fetchServerStatus('creative', 'bedrock')
    ]);

    updateServerInfo(survivalJava, survivalBE, '');
    updateServerInfo(creativeJava, creativeBE, 'creative');
}

// 初始化與定時更新
updateAllServers();
setInterval(updateAllServers, 60000);
