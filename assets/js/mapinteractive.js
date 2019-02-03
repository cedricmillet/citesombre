
	/*
		Classe pour la creation de map interactive
		Necessite un container avec UNE SEULE image, ce sera la 'map'
        Développé par Cédric MILLET (cedric.millet@abyxo.agency) le 21/01/2019
	*/
    class MapInteractive {
    	constructor(mapcontainer, taillesreference, pointsproportionnels, tableau)
    	{
            //VARIABLES GLOBALES
    		this.mapcontainer = mapcontainer;
    		this.map = mapcontainer.children('img');
    		this.taillesreference = taillesreference;
    		this.pointsproportionnels = pointsproportionnels;
            this.tableau = tableau;
    		this.points = []; 

            //SECURITES
    		if(this.map.length==0) { alert('Aucune carte (img) presente dans le mapcontainer !'); return;  }
            if(this.map.length>1) { alert('Le map container contient plusieurs images !'); return;  }
    		if(this.tableau.length==0) { alert('Le tableau précisé est inexistant du DOM !'); return;  }


            //EVENTS
    		var _this = this;
    		$( window ).resize(function() {
			  _this.updatePositionPoints();
			});

            this.tableau.on('mouseover', 'tr', function() {
                var tag = $(this).data('tagpoint');
                if(tag != null)
                {
                    _this.selectPoint(tag);
                }
            });
            this.tableau.mouseleave(function() {
              _this.selectPoint('');
            });
    	}

    	//	Mettre à jour la position relative de tous les points de la map (% de la dimension actuelle fenetre/dimensions_refs depart)
    	updatePositionPoints() {
    		for(var i=0; i<this.points.length; i++)
    		{
    			//console.log("Update point --> id=", this.points[i].id);
    			var point = this.points[i];
    			var nX = parseInt(point.x * this.map.width() / this.taillesreference.x);
    			var nY = parseInt(point.y*this.map.height() / this.taillesreference.y );
    			$('div.point#point-'+point.id).css('top', nY+'px');
    			$('div.point#point-'+point.id).css('left', nX+'px');

    			if(this.pointsproportionnels)
    			{
    				var nLargeur = parseInt(point.diametre * this.map.width() / this.taillesreference.x);
    				$('div.point#point-'+point.id).css('width', nLargeur+'px');
    				$('div.point#point-'+point.id).css('height', nLargeur+'px');
    			}

    		}
    	}

    	//	Ajouter un point à la map
    	ajouterPoint(x, y, couleur, diametre, tag)
    	{
    		if(	parseInt(x*this.map.width()/this.taillesreference.x) > this.map.width() || x<0
    			|| parseInt(y*this.map.height()/this.taillesreference.y) > this.map.height() || y<0 )
    		{
    			console.log("ERREUR ! Ce point sort de la map interactive (X) !");
    			return;
    		}

    		this.points.push({	
    							x: x, 
    							y: y, 
    							couleur: couleur,
    							diametre: diametre,
                                tag: tag,
    							id: this.mapcontainer.attr('id')+'-'+(this.points.length+1)
    						});

    	}

    	//	Afficher tous les points de la map
    	afficher()
    	{
            //  Ajout de chacun des points au DOM
    		for(var i=0; i<this.points.length; i++)
    		{
    			//console.log("Affichage point --> id=", this.points[i].id);
    			var point = this.points[i];
    			var nX = parseInt(point.x*this.map.width() /this.taillesreference.x);
    			var nY = parseInt(point.y*this.map.height() / this.taillesreference.y );
				var nDiametre = parseInt(point.diametre * this.map.width() / this.taillesreference.x);
				if(!this.pointsproportionnels)
					nDiametre = point.diametre;
    			this.mapcontainer.append('<div class="point" data-tag="'+this.points[i].tag+'" id="point-'+this.points[i].id+'" style="width:'+nDiametre+'px;height:'+nDiametre+'px;border-radius:50%;top:'+nY+'px;left:'+nX+'px;background:'+point.couleur+'">');
    		}
            // CSS pour l'ensemble des points
    		this.mapcontainer.css('position', 'relative');
    		this.mapcontainer.children('div.point').css('position', 'absolute');
    		this.mapcontainer.children('div.point').css('transform', 'translate(-50%, -50%)');
    	}

        //  Ajouter la class 'selectedpoint' à un point en particulier
        selectPoint(tagpoint)
        {
            for(var i=0; i<this.points.length; i++)
            {
                var point = this.points[i];
                var selecteur = $('div.point#point-'+point.id+'[data-tag="'+point.tag+'"]'); //secu si tagpoint present dans plusieurs maps de la meme page
                if(tagpoint == point.tag)
                    selecteur.addClass('selectedpoint');
                else
                    selecteur.removeClass('selectedpoint');
            } 
        }

        //  END CLASS
    }

