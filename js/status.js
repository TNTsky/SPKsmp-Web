async function fetchServerStatus(address, type) {
    const url = type === 'java'
        ? `https://motdbe.blackbe.work/api/java?host=${address}`
        : `https://motdbe.blackbe.work/api?host=${address}`;
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${type} server status for ${address}:`, error);
        return null;
    }
}

function updateServerInfo(javaData, beData, serverId) {
    const javaStatusElement = document.getElementById(`${serverId ? serverId + '-' : ''}java-status`);
    const beStatusElement = document.getElementById(`${serverId ? serverId + '-' : ''}be-status`);
    const javaVersionElement = document.getElementById(`${serverId ? serverId + '-' : ''}java-version`);
    const beVersionElement = document.getElementById(`${serverId ? serverId + '-' : ''}be-version`);
    const playersElement = document.getElementById(`${serverId ? serverId + '-' : ''}players`);

    if (javaData && javaData.status === 'online') {
        javaStatusElement.textContent = '在線';
        javaStatusElement.style.color = '#2ecc71';
        javaVersionElement.textContent = javaData.version;
    } else {
        javaStatusElement.textContent = '離線';
        javaStatusElement.style.color = '#e74c3c';
        javaVersionElement.textContent = 'N/A';
    }

    if (beData && beData.status === 'online') {
        beStatusElement.textContent = '在線';
        beStatusElement.style.color = '#2ecc71';
        beVersionElement.textContent = beData.version;
    } else {
        beStatusElement.textContent = '離線';
        beStatusElement.style.color = '#e74c3c';
        beVersionElement.textContent = 'N/A';
    }

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
        fetchServerStatus('spksmp.top:30100', 'java'),
        fetchServerStatus('spksmp.top:30100', 'bedrock'),
        fetchServerStatus('spksmp.top:30123', 'java'),
        fetchServerStatus('spksmp.top:30123', 'bedrock')
    ]);

    updateServerInfo(survivalJava, survivalBE, '');
    updateServerInfo(creativeJava, creativeBE, 'creative');
}

updateAllServers();

setInterval(updateAllServers, 60000);