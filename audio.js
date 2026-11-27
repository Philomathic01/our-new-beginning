/* Playback is unlocked only by an intentional visitor tap. */
let musicPreferenceSet=false, musicEnabled=false, musicPlayer=null, musicGeneration=0, fadeFrame=0;
let voicePlayer=null, activeVoice=null, voiceGeneration=0;
const voiceCards=[];
const chapterIndex=()=>step===0?(weddingPhase?1:0):step+1;
function updateProgress(){[...$('track').children].forEach((node,i)=>node.classList.toggle('done',i<=chapterIndex()));}
function clampVolume(v){return Math.max(0,Math.min(1,Number.isFinite(+v)?+v:0.38));}
function updateMusicButton(){const b=$('music');b.setAttribute('aria-pressed',String(musicEnabled));b.setAttribute('aria-label',musicEnabled?'Turn music off':'Turn music on');b.title=musicEnabled?'Music on — tap to mute':'Music off — tap to play';b.textContent=musicEnabled?'♪':'♫';}
function enableMusic(){musicEnabled=true;updateMusicButton();}
function stopMusic(){musicGeneration++;cancelAnimationFrame(fadeFrame);if(musicPlayer){musicPlayer.pause();musicPlayer.removeAttribute('src');musicPlayer.load();musicPlayer=null;}}
function fadeIn(player,target){cancelAnimationFrame(fadeFrame);const start=performance.now();function frame(now){if(player!==musicPlayer||player.paused)return;player.volume=target*Math.min(1,(now-start)/650);if(now-start<650)fadeFrame=requestAnimationFrame(frame);}fadeFrame=requestAnimationFrame(frame);}
function playMusic(){if(!musicEnabled||voicePlayer&&!voicePlayer.paused)return;const cfg=AUDIO_SETTINGS.songs[chapterIndex()]||{};const g=++musicGeneration;const prev=musicPlayer;cancelAnimationFrame(fadeFrame);if(prev){prev.pause();prev.removeAttribute('src');prev.load();}const player=new Audio();musicPlayer=player;player.preload='auto';player.loop=true;const target=clampVolume(cfg.volume??AUDIO_SETTINGS.musicVolume);player.volume=0;let fallback=false;
 function load(isFallback){if(g!==musicGeneration||!musicEnabled)return;fallback=isFallback;player.src=isFallback?AUDIO_SETTINGS.fallback:cfg.file;player.load();const result=player.play();if(result)result.catch(err=>{if(g!==musicGeneration||!musicEnabled||err.name==='AbortError')return;if(err.name==='NotAllowedError'){toast('Tap ♫ to start the music.');return;}if(!fallback)load(true);});}
 player.addEventListener('error',()=>{if(g===musicGeneration&&musicEnabled&&!fallback)load(true);});
 player.addEventListener('loadedmetadata',()=>{const offset=fallback?0:Math.max(0,Number(cfg.start)||0);if(offset&&Number.isFinite(player.duration))try{player.currentTime=offset<player.duration?offset:0;}catch(_){};});
 player.addEventListener('playing',()=>{if(g===musicGeneration){if(voicePlayer&&!voicePlayer.paused)player.pause();else fadeIn(player,target);}});
 load(!cfg.file);
}
function resumeMusic(){if(!musicEnabled)return;if(musicPlayer){musicPlayer.play().catch(()=>{if(musicEnabled)toast('Tap ♫ to resume music.');});}else playMusic();}
function resetVoiceUI(card){if(!card)return;card.el.classList.remove('is-playing');card.button.textContent='▶ Play voice message';card.progress.value=0;card.status.textContent='Tap play when you’re ready.';}
function stopVoice(resume=false){voiceGeneration++;if(voicePlayer){voicePlayer.pause();voicePlayer.removeAttribute('src');voicePlayer.load();voicePlayer=null;}resetVoiceUI(activeVoice);activeVoice=null;if(resume)resumeMusic();}
function refreshChapterAudio(){stopVoice(false);voiceCards.forEach(c=>{c.el.open=false;resetVoiceUI(c);});if(musicEnabled)playMusic();else stopMusic();}
function playVoice(card){if(activeVoice===card&&voicePlayer){if(!voicePlayer.paused){voicePlayer.pause();card.button.textContent='▶ Continue listening';card.el.classList.remove('is-playing');card.status.textContent='Paused';resumeMusic();return;}if(voicePlayer.ended)voicePlayer.currentTime=0;musicPlayer?.pause();voicePlayer.play().catch(()=>{card.status.textContent='Recording unavailable. Please try again.';resumeMusic();});return;}
 stopVoice(false);musicPlayer?.pause();const g=++voiceGeneration;const p=new Audio();voicePlayer=p;activeVoice=card;p.preload='auto';p.src=card.config.file;card.status.textContent='Opening your voice note…';card.button.textContent='Loading…';
 const current=()=>g===voiceGeneration&&activeVoice===card;
 const fail=()=>{if(!current())return;stopVoice(false);card.status.textContent='This recording has not been added yet.';resumeMusic();};
 p.addEventListener('error',fail);p.addEventListener('playing',()=>{if(!current())return;musicPlayer?.pause();card.el.classList.add('is-playing');card.button.textContent='❚❚ Pause voice message';card.status.textContent='Just for you, Shivani ♡';});
 p.addEventListener('timeupdate',()=>{if(current()&&Number.isFinite(p.duration)&&p.duration>0)card.progress.value=p.currentTime/p.duration;});
 p.addEventListener('ended',()=>{if(!current())return;card.el.classList.remove('is-playing');card.button.textContent='↺ Replay voice message';card.status.textContent='With warmth, Kishan ♡';card.progress.value=1;resumeMusic();});
 p.play().catch(fail);
}
function initAudioCards(){updateMusicButton();$('music').onclick=()=>{musicPreferenceSet=true;if(musicEnabled){musicEnabled=false;stopMusic();}else{enableMusic();playMusic();}updateMusicButton();};
 for(const config of AUDIO_SETTINGS.voices){const mount=$(config.mount);if(!mount||!config.enabled||!config.file)continue;const el=document.createElement('details');el.className='voice-card';const summary=document.createElement('summary');const icon=document.createElement('span');icon.className='voice-icon';icon.textContent='♡';const title=document.createElement('span');title.textContent=config.title;summary.append(icon,title);const inner=document.createElement('div');inner.className='voice-inner';const wave=document.createElement('div');wave.className='voice-wave';wave.setAttribute('aria-hidden','true');for(let i=0;i<29;i++){const bar=document.createElement('i');bar.style.setProperty('--h',`${6+25*Math.abs(Math.sin(i*.61)*Math.cos(i*.17))}px`);bar.style.setProperty('--d',`${-(i%7)*.12}s`);wave.append(bar);}const button=document.createElement('button');button.type='button';button.className='voice-play';button.textContent='▶ Play voice message';const progress=document.createElement('progress');progress.className='voice-progress';progress.max=1;progress.value=0;progress.setAttribute('aria-label','Voice message progress');const status=document.createElement('p');status.className='voice-status';status.setAttribute('aria-live','polite');status.textContent='Tap play when you’re ready.';inner.append(wave,button,progress,status);el.append(summary,inner);mount.append(el);const card={el,button,progress,status,config};voiceCards.push(card);button.onclick=()=>playVoice(card);el.addEventListener('toggle',()=>{if(!el.open&&activeVoice===card)stopVoice(true);});}
}
