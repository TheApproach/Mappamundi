// Anatomy of Approach Javascript Modules

import {addScopeJS, overwriteDefaults} from "./utility.js";

addScopeJS(["Approach", "Stage", "main"],{});
addScopeJS(["Approach", "Stage", "active"],{});

Approach.Compositor.main = function(config = {}){

	let $elf = {};	// or let $elf = this;
	$elf.config = {
		game : 				'#Game',		// default container
		screen:{
			backdrop: 		'#Backdrop',	// default backdrop buffer
			main: 			'#Main',		// default main buffer
			overlay: 		'#Overlay',		// default overlay buffer
			dialog: 		'#Dialog',		// default dialog buffer
			hud: 			'#HUD',			// default HUD buffer
			offscreen: 		'#Offscreen',	// default offscreen buffer
		},
		dock:{
			backdrop		:{
				north: 			'#Backdrop > .Dock.North',
				east: 			'#Backdrop > .Dock.East',
				south: 			'#Backdrop > .Dock.South',
				west: 			'#Backdrop > .Dock.West'
			},
			main			:{
				north: 			'#Main > .Dock.North',
				east: 			'#Main > .Dock.East',
				south: 			'#Main > .Dock.South',
				west: 			'#Main > .Dock.West'
			},
			overlay			:{
				north: 			'#Overlay > .Dock.North',
				east: 			'#Overlay > .Dock.East',
				south: 			'#Overlay > .Dock.South',
				west: 			'#Overlay > .Dock.West'
			},
			dialog			:{
				north: 			'#Dialog > .Dock.North',
				east: 			'#Dialog > .Dock.East',
				south: 			'#Dialog > .Dock.South',
				west: 			'#Dialog > .Dock.West'
			},
			hud				:{
				north: 			'#HUD > .Dock.North',
				east: 			'#HUD > .Dock.East',
				south: 			'#HUD > .Dock.South',
				west: 			'#HUD > .Dock.West'
			},
			offscreen		:{
				north: 			'#Offscreen > .Dock.North',
				east: 			'#Offscreen > .Dock.East',
				south: 			'#Offscreen > .Dock.South',
				west: 			'#Offscreen > .Dock.West'
			},
			north: 			'#Game > * > .Dock.North',
			east: 			'#Game > * > .Dock.East',
			south: 			'#Game > * > .Dock.South',
			west: 			'#Game > * > .Dock.West',
		}
	};
	$elf.managed = { 
		/* Instances of other plugins here */ 
		character:{
			players: 	[
				{
					id: 	'0',
					name: 	'Player One',
					avatar: 'heroes/jack',
					sprite: 'heroes/jack',
					map: 	'campaign/Nexus_of_Realms',
					jobs: 	{
						// innate jobs
						adventurer: 	1,	// none		|	I.0,	// gains XP from all sources, as any job
						mercenary: 		0,	// none		|	I.1,	// gains XP from bounties, as any job
						artisan: 		0,	// none		|	I.2,	// gains XP from certified curating
						explorer: 		0,	// none		|	I.3,	// gains XP from creating and completing quests made by the player

						// role jobs
						tank: 		0,		// tank		|	C.T0
						healer: 	0,		// healer	|	C.H0
						mage: 		1,		// mage		|	C.M0
						ranger: 	0,		// ranger	|	C.R0

						// specialist jobs
						templar: 	null,	// tank		|	B.T0.T0
						knight: 	null,	// tank		|	B.T0.T1

						priest: 	null,	// healer	|	B.H0.H0
						medic:	 	null,	// healer	|	B.H0.H1

						magus: 		null,	// mage		|	B.M0.M0
						enchanter: 	null,	// mage		|	B.M0.M1

						bard: 		null,	// ranger	|	B.R0.R0
						scout: 		null,	// ranger	|	B.R0.R0


						// mastery jobs
						paladin: 	null,	// tank		|	A.T0.T0.T0	//  branches from tank\templar
						crusader: 	null,	// tank		|	A.T0.T0.T1	//  branches from tank\templar
						warden: 	null,	// tank		|	A.T0.T1.T0	//  branches from tank\knight
						champion: 	null,	// tank		|	A.T0.T1.T1	//  branches from tank\knight

						cleric: 	null,	// healer	|	A.H0.H0.H0	//  branches from healer\priest
						oracle: 	null,	// healer	|	A.H0.H1.H0	//  branches from healer\priest
						alchemist: 	null,	// healer	|	A.H0.H1.H1	//  branches from healer\medic
						surgeon: 	null,	// healer	|	A.H0.H1.H1	//  branches from healer\medic

						mystic: 	null,	// mage		|	A.M0.M0.M0	//  branches from mage\magus
						sage: 		null,	// mage		|	A.M0.M0.M1	//  branches from mage\magus
						summoner: 	null,	// mage		|	A.M0.M1.M0	//  branches from mage\enchanter
						geomancer: 	null,	// mage		|	A.M0.M1.M1	//  branches from mage\enchanter

						minstrel: 	null,	// ranger	|	A.R0.R0.R0	//  branches from ranger\bard 
						diplomat: 	null,	// ranger	|	A.R0.R0.R1	//  branches from ranger\bard
						commando: 	null,	// ranger	|	A.R0.R1.R0	//  branches from ranger\scout
						sniper: 	null,	// ranger	|	A.R0.R1.R1	//  branches from ranger\scout

						// the four synergy jobs require 4 mastery jobs of the same family and 4 of different families 
						// player must have minimum job rank of 50 in each job to unlock synergy jobs, plus two of rank 100 in the unlocked family
						
						paladin_of_phoenix_flame: 		null,	// tank		|	S.T0
						saint_of_the_eternal_light: 	null,	// healer	|	S.H0
						bender_of_space_and_time:	 	null,	// mage		|	S.M0
						voice_of_ancient_shadow: 		null,	// ranger	|	S.R0
					},

					stats: { 
						hp: 		200, 	mp: 40,				stamina: 100,
						power: 		10,		will: 10,			speed: 10,
						resilience: 10, 	charisma: 10,		luck: 10,
						xp: 		0,		ap: 0,				gp: 0
					},

					x: 		8,
					y: 		12,
					z: 		1,
					facing: 'south',
					actions:[
						{
							id: 	'attack',
							name: 	'Attack',
							cooldown: 1000,
							damage: 10,
							range: 	1,
							aoe: 	0,
							cost: 	0,
							cooldown: 1000,
							cooldown: 1000,
						}
					]
				}
			],
			enemies: 	[

			],
			npcs: 		[

			],
			entities: 	[

			]
		}
	};
	$elf.active = { 
		/* Let the user know currently selected state information processing here */ 
		key : null,
	};

	// Temporarily used for greater cross-environment module compatibility, rather than inline defaults
	overwriteDefaults(config,$elf.config);

	// check if config.self is set and not empty, if so, overwrite $elf with config.self
	if(Object.keys(config.self).length > 0 && config.self.constructor === Object)
		$elf = config.self;

	$elf.init = function(){
		let config = $elf.config;
		$(config.container).on('keydown', dispatch.keystroke);
		$(config.container).on('warp.game', dispatch.warp);
	};

	$elf.call = {
		get : function(key=null){
			if($elf.managed.hasOwnProperty(key))
				return $elf.managed[key];
			return $elf.managed;
		},
		set : function(incoming){
			let changed = [];
			for (let [key, value] of Object.entries(incoming)){
				if (incoming.hasOwnProperty(key) && $elf.managed.hasOwnProperty(key)){
					if( $elf.managed[key] != value){
						$elf.managed[key] = value;
						changed.push(key);
					}
				}
			}
			sync_properties(changed);
			if(changed.length > 0)
			
			return $elf.managed;
		}
	}
	
	dispatch = {
		keystroke : function(e){
			$elf.active.key = e.key;
			$(this).trigger('keystroke.game');
		},

		keyboard:{
			up: function(e){},
			down: function(e){},
			left: function(e){},
			right: function(e){},
			select: function(e){},
			jump: function(e){},
			menu: function(e){},
			skills: function(e){}
		},

		warp : function(e){
			console.group('Warping initiated...');
			console.log('Fast travel to:', e.detail, 'map/region/zone/name.');
		},

		specialEvent : function(e){
			let thing = $(e.target).closest( $elf.config.container );
			// look for selector relative to thing
			// do something
		}
	}

	$elf.init();
	return $elf;
};
