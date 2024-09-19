const BASE_URL = "https://nbaserver-q21u.onrender.com/api/filter";

interface Players {
    position: string;
    twoPercent: number;
    threePercent: number;
    points: number;
    playerName?: string;
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('SearchButton')?.addEventListener('click', async () => {
        const position = (document.getElementById('position') as HTMLSelectElement).value;
        const twoPercent = parseInt((document.getElementById('TwoPercents') as HTMLInputElement).value) || 0;
        const threePercent = parseInt((document.getElementById('ThreePercents') as HTMLInputElement).value) || 0;
        const points = parseInt((document.getElementById('Points') as HTMLInputElement).value) || 0;
        
        const request = {
            position,
            twoPercent,
            threePercent,
            points
        };
        
        try {
            const response = await fetch(BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request)
            });
        
            if (!response.ok) throw new Error('Failed to fetch players');
        
            const players: Players[] = await response.json();
            displayPlayers(players);
        } catch (error) {
            console.error(error);
        }
    });
});


function displayPlayers(players: Players[]) {
    const resultsBody = document.getElementById('playersRows') as HTMLElement;
    resultsBody.textContent = ''; 

    players.forEach(player => {
        const row = document.createElement('tr');

        const name = document.createElement('td');
        name.textContent = player.playerName??'';

        const position = document.createElement('td');
        position.textContent = player.position;

        const points = document.createElement('td');
        points.textContent = player.points.toString();

        const twoPercent = document.createElement('td');
        twoPercent.textContent =` ${player.twoPercent}%`;

        const threePercent = document.createElement('td');
        threePercent.textContent = `${player.threePercent}%`;

        const button = document.createElement('td');
        const addButton = document.createElement('button');
        addButton.textContent = `Add ${player.playerName} to my Team`;
        button.appendChild(addButton); 

        row.appendChild(name);
        row.appendChild(position);
        row.appendChild(points);
        row.appendChild(twoPercent);
        row.appendChild(threePercent);
        row.appendChild(button);
        resultsBody.appendChild(row);

        addButton.addEventListener('click', () => addPlayer(player));
    })
};

function addPlayer(player: Players) {

    const positionDiv = document.getElementById(`${player.position}P`) as HTMLElement;
        const playerDiv = document.getElementById(`${player.position}`) as HTMLElement;
        playerDiv.textContent = '';
        playerDiv.style.display = 'block';
    
        const nameElement = document.createElement('p');
        nameElement.textContent = `${player.playerName ?? 'Unknown Player'}`;

        const threePercentElement = document.createElement('p');
        threePercentElement.textContent = `Three Percent: ${player.threePercent}%`;
        
        const twoPercentElement = document.createElement('p');
        twoPercentElement.textContent = `Two Percent: ${player.twoPercent}%`;

        const pointsElement = document.createElement('p');
        pointsElement.textContent = `Points:${player.points}`;

        playerDiv.appendChild(nameElement);
        playerDiv.appendChild(threePercentElement);
        playerDiv.appendChild(twoPercentElement);
        playerDiv.appendChild(pointsElement);

        positionDiv.appendChild(playerDiv)

}
