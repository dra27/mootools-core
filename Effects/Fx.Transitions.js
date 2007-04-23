/*
Script: Fx.Transitions.js
	Effects transitions, to be used with all the effects.

Author:
	Easing Equations by Robert Penner, <http://www.robertpenner.com/easing/>, modified & optimized to be used with mootools.

License:
	Easing Equations v1.5, (c) 2003 Robert Penner, all rights reserved. Open Source BSD License.
*/

/*
Class: Fx.Transitions
	A collection of tweening transitions for use with the <Fx.Base> classes.
	Some transitions accept additional parameters. You can set them using the .set property of each transition type.
	
Example:
	>new Fx.Style('margin', {transition: Fx.Transitions.Elastic.easeInOut});
	>//Elastic.easeInOut with default values
	>new Fx.Style('margin', {transition: Fx.Transitions.Elastic.easeInOut.set(3)});
	>//Elastic.easeInOut with user-defined value for elasticity.
	>p, t, c, d means: // p: current time / duration, t: current time, c: change in value (distance), d: duration

See also:
	http://www.robertpenner.com/easing/
*/

Fx.Transitions = new Abstract({
	
	/*
	Property: linear
		displays a linear transition.
		
	Graph:
		(see Linear.png)
	*/
	
	linear: function(t, c, d){
		return c * (t / d);
	}

});

Fx.Shared.CreateTransitionEases = function(transition, type){
	$extend(transition, {
		easeIn: function(p, x, y, z){
			return transition(p, x, y, z);
		},

		easeOut: function(p, x, y, z){
			return 1 - transition(1 - p, x, y, z);
		},

		easeInOut: function(p, x, y, z){
			return (p <= 0.5) ? transition(2 * p, x, y, z) / 2 : (2 - transition(2 * (1 - p), x, y, z)) / 2;
		}
	});
	//compatibility
	['In', 'Out', 'InOut'].each(function(mode){
		transition['ease' + mode].set = Fx.Shared.SetTransitionValues(transition['ease' + mode]);
		Fx.Transitions[type.toLowerCase() + mode] = transition['ease' + mode];
	});
};

Fx.Shared.SetTransitionValues = function(transition){
	return function(){
		var args = $A(arguments);
		return function(){
			return transition.apply(Fx.Transitions, $A(arguments).concat(args));
		};
	}
};

Fx.Transitions.extend = function(transitions){
	for (var type in transitions){
		if (type.test(/^[A-Z]/)) Fx.Shared.CreateTransitionEases(transitions[type], type);
		else transitions[type].set = Fx.Shared.SetTransitionValues(transitions[type]);
		Fx.Transitions[type] = transitions[type];
	}
};

Fx.Transitions.extend({
	
	/*
	Property: Quad
		displays a quadratic transition. Must be used as Quad.easeIn or Quad.easeOut or Quad.easeInOut
		
	Graph:
		(see Quad.png)
	*/
	
	//auto generated

	/*
	Property: Cubic
		displays a cubicular transition. Must be used as Cubic.easeIn or Cubic.easeOut or Cubic.easeInOut
		
	Graph:
		(see Cubic.png)
	*/
	
	//auto generated

	/*
	Property: Quart
		displays a quartetic transition. Must be used as Quart.easeIn or Quart.easeOut or Quart.easeInOut
		
	Graph:
		(see Quart.png)
	*/
	
	//auto generated
	
	/*
	Property: Quint
		displays a quintic transition. Must be used as Quint.easeIn or Quint.easeOut or Quint.easeInOut
		
	Graph:
		(see Quint.png)
	*/

	//auto generated
	
	/*
	Property: Pow
		Used to generate Quad, Cubic, Quart and Quint.
		By default is p^6.
		
	Graph:
		(see Pow.png)
	*/
	
	Pow: function(p, x){
		x = x || 6;
		return Math.pow(p, x);
	},

	/*
	Property: Expo
		displays a exponential transition. Must be used as Expo.easeIn or Expo.easeOut or Expo.easeInOut
		
	Graph:
		(see Expo.png)
	*/
	
	Expo: function(p){
		return Math.pow(2, 8 * (p - 1));
	},

	/*
	Property: Circ
		displays a circular transition. Must be used as Circ.easeIn or Circ.easeOut or Circ.easeInOut
		
	Graph:
		(see Circ.png)
	*/
	
	Circ: function(p){
		return 1 - Math.sin(Math.acos(p));
	},
	

	/*
	Property: Sine
		displays a sineousidal transition. Must be used as Sine.easeIn or Sine.easeOut or Sine.easeInOut
		
	Graph:
		(see Sine.png)
	*/
	
	Sine: function(p){
		return 1 - Math.sin((1 - p) * Math.PI / 2);
	},

	/*
	Property: Back
		makes the transition go back, then all forth. Must be used as Back.easeIn or Back.easeOut or Back.easeInOut
		set(x) changes the way it overshoots the target, default is 1.61803398874989 (PHI - "The Golden Ratio")
		
	Graph:
		(see Back.png)
	*/

	Back: function(p, x){
		x = x || 1.6180;
		return Math.pow(p, 2) * ((x + 1) * p - x);
	},

	/*
	Property: Bounce
		makes the transition bouncy. Must be used as Bounce.easeIn or Bounce.easeOut or Bounce.easeInOut
		
	Graph:
		(see Bounce.png)
	*/
	
	Bounce: function(p){
		var y, b = 7.5625;
		p = 1 - p;
		if (p < (1 / 2.75)) y = b * Math.pow(p, 2);
		else if (p < (2 / 2.75)) y = b * (p -= (1.5 / 2.75)) * p + 0.75;
		else if (p < (2.5 / 2.75)) y = b * (p -= (2.25 / 2.75)) * p + 0.9375;
		else y = b * (p -= (2.625 / 2.75)) * p + 0.984375;
		return - y + 1;
	},

	/*
	Property: Elastic
		Elastic curve. Must be used as Elastic.easeIn or Elastic.easeOut or Elastic.easeInOut
		set(x) works as a multiplier of the elasicity effect. set(2) makes it twice as strong
		
	Graph:
		(see Elastic.png)
	*/
	
	Elastic: function(p, x, y){
		y = y || 300;
		x = y * 0.3 / (x || 1);
		return Math.pow(2, 10 * (p -= 1)) * Math.cos(2 * Math.PI * p * y / x);
	}

});

['Quad', 'Cubic', 'Quart', 'Quint'].each(function(transition, i){
	var obj = {};
	obj[transition] = function(p){
		return Fx.Transitions.Pow(p, i + 2);
	};
	Fx.Transitions.extend(obj);
});