"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const BASE_URL = "https://nbaserver-q21u.onrender.com/api/filter";
document.addEventListener('DOMContentLoaded', () => {
    var _a;
    (_a = document.getElementById('SearchButton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        const position = document.getElementById('position').value;
        const twoPercent = parseInt(document.getElementById('TwoPercents').value) || 0;
        const threePercent = parseInt(document.getElementById('ThreePercents').value) || 0;
        const points = parseInt(document.getElementById('Points').value) || 0;
        const request = {
            position,
            twoPercent,
            threePercent,
            points
        };
        try {
            const response = yield fetch(BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request)
            });
            if (!response.ok)
                throw new Error('Failed to fetch players');
            const players = yield response.json();
            displayPlayers(players);
        }
        catch (error) {
            console.error(error);
        }
    }));
});
function displayPlayers(players) {
    const resultsBody = document.getElementById('playersRows');
    resultsBody.textContent = '';
    players.forEach(player => {
        var _a;
        const row = document.createElement('tr');
        const name = document.createElement('td');
        name.textContent = (_a = player.playerName) !== null && _a !== void 0 ? _a : '';
        const position = document.createElement('td');
        position.textContent = player.position;
        const points = document.createElement('td');
        points.textContent = player.points.toString();
        const twoPercent = document.createElement('td');
        twoPercent.textContent = ` ${player.twoPercent}%`;
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
    });
}
;
function addPlayer(player) {
    var _a;
    const positionDiv = document.getElementById(`${player.position}P`);
    const playerDiv = document.getElementById(`${player.position}`);
    playerDiv.textContent = '';
    playerDiv.style.display = 'block';
    const nameElement = document.createElement('p');
    nameElement.textContent = `${(_a = player.playerName) !== null && _a !== void 0 ? _a : 'Unknown Player'}`;
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
    positionDiv.appendChild(playerDiv);
}
