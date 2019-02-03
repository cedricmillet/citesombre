
		
		//Classe pour carroussel
		class CarrousselCatalogue {
			constructor(carroussel) {
				
				this.carroussel = carroussel;
				this.carrousselIsStarted = false;
				this.images = [];
				this.current_slide = 0;
				this.intervalle = 0;
				
			}

			ajouterImage(url_image)
			{
				this.images.push(url_image);
			}

			loadEvents() {
				var t= this.intervalle;
				if(t==0) t=3000;

				var _this = this;
				var tid = setInterval(function() {
					_this.slideSuivante();
				}, t);
			}

			setIntervalleSlides(i) {
				if(i<= 0) i=1000;
				this.intervalle = i;
			}

			slideSuivante() {
				if(!this.carrousselIsStarted) return;

				var next_slide = this.current_slide+1;
				if(next_slide>this.images.length-1)
					next_slide = 0;

				//mise a jour nouvelle slide
				var urlimg = this.getSlideURL(next_slide);
				console.log('slide suivante : ', next_slide, ' - url: ', urlimg)

				$(this.carroussel).attr('src', urlimg);

				//incrementation
				this.current_slide = next_slide;
			}

			getSlideURL(n)
			{
				return this.images[n];
			}

			lancer() {
				this.carrousselIsStarted = true;
				this.loadEvents();
			}

			stopper() {
				this.carrousselIsStarted = false;
				this.current_slide = 0;
			}
		}
		