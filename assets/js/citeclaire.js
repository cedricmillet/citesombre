	
		$( document ).ready(function() {
		    //...
		});


		//=============================================================================
		class ModeFonduChangementPage
		{
			constructor()
			{
				this.charger_event_onload();
				this.charger_event_onclicklink();

				this.id_overlay = "overlay_animation_fade";
				this.duree_degrade_on_click = 700;
				this.opacite_max_overlay = 1;
			}

			charger_event_onclicklink()
			{
				var _this = this;
				$('a').click(function(e) {
					//Pas de fondu pour les liens qui ne redirigent pas
					if($(this).attr('href')=='#' || $(this).attr('href').charAt(0)=='#')
					{
						//console.log('aucun fondu pour cet element - citeclaire.js')
						return;
					}
					//On stoppe la redirection
					e.preventDefault();
					//On ajoute l'overlay
				    var html = '<div id="'+_this.id_overlay+'" style="position: fixed;top:0;left:0;right:0;bottom:0;background-color:white;opacity:0"></div>';
				    $('body').append(html);
				    var lien = this.href;
				    //On anime l'opacite
				    $( "#"+_this.id_overlay ).fadeTo( _this.duree_degrade_on_load , _this.opacite_max_overlay, function() {
					    // On redirige à la fin de l'animation
					    window.location = lien;
				  	});
				});
			}

			charger_event_onload()
			{
				var _this = this;
				//On ajoute l'overlay
				var id_overlay = "overlay_animation_fade";
				var duree_degrade = 700;

			    var html = '<div id="'+id_overlay+'" style="position: fixed;top:0;left:0;right:0;bottom:0;background-color:white;opacity:1"></div>';
			    $('body').append(html);
			    
			    //On anime l'opacite
			    //console.log('ajout de ', id_overlay)
			    //console.log('duree', duree_degrade)
			    $( "#"+id_overlay ).fadeTo( duree_degrade , 0, function() {
				    // On supprime overlay à la fin de l'animation
				    $( "#"+id_overlay ).remove();
			  	});
			}
		}
		new ModeFonduChangementPage();

		//=============================================================================
		class TraitementPaginationMenuEclairage {
			constructor()
			{
				//Charger les events UI
				this.loadEvents();

				//Si la page est chargée avec une ancre sur une page specifique (#mobilier pr exemple)
				if($(location).attr('hash') != '')
				{
					var page_cible = $(location).attr('hash');
					$('.menu-eclairage a').removeClass('current');
					$('.menu-eclairage a[href="'+page_cible+'"]').addClass('current');
					this.chargerNouvellePage();
				}
				else
				{
					//On cache toutes les pages
					this.cacherToutesLesPages();
					this.chargerPageSelectionnee();
				}
			}
			loadEvents()
			{
				var _this = this;
				$('.menu-eclairage a').click(function(e) {
					$('.menu-eclairage a').removeClass('current');
					$(this).addClass('current');
					_this.chargerNouvellePage();
				});
			}
			chargerNouvellePage()
			{
				this.cacherToutesLesPages();
				this.chargerPageSelectionnee();
			}
			chargerPageSelectionnee() {
				//on recupere la page selectionnee
				var id_page = $('.menu-eclairage a.current').attr('href');
				//on affiche la bonne page
				var page = $('#page-container-menu-eclairage .page[data-idpage="'+id_page+'"]');
				if(page.length>0)
				{
					page.css('display', 'block');
					//on affiche la bonne image
					var url_image = page.data('image');
					$('div#container-image-coin-droit img').attr('src', url_image);
					//on met à jour le filigrane
					$('#filigrane').html(id_page.replace('#', ''));
				}
				else
				{
					console.log('La page selectionnee est introuvable (id='+id_page+')')
				}
			}
			cacherToutesLesPages()
			{
				$('#page-container-menu-eclairage .page').css('display', 'none');
			}
		}
		//Instance de la classe pagination pour la page "SOLUTIONS"
		if($('#page-solutions').length>0)
			new TraitementPaginationMenuEclairage;


		//=============================================================================
		class TraitementPaginationServices {
			constructor() {
				this.loadEvents();
				this.chargerPageSelectionnee();
			}
			loadEvents()
			{
				var _this = this;
				$('#leftmenu div.leftmenu-item').click(function(e) {
					$('#leftmenu div.leftmenu-item.current').removeClass('current');
					$(this).addClass('current');
					_this.chargerNouvellePage();
				});
			}
			chargerNouvellePage() {
				this.resetPage();
				this.chargerPageSelectionnee();
			}
			chargerPageSelectionnee() {
				var idpage = $('#leftmenu div.leftmenu-item.current').data('idpage');
				var currentpage = $('#page-container-menu-services div.page[data-idpage="'+idpage+'"]'); 
				var html_section1 = currentpage.children('section.section1').html();
				var html_section2 = currentpage.children('section.section2').html();
				var html_section3 = currentpage.children('section.section3').html();


				$('#pagesection1').html(html_section1);
				$('#pagesection2').html(html_section2);
				$('#pagesection3').html(html_section3);
				$('#container-image-coin-droit img').attr('src', currentpage.attr('data-image'));

				if(idpage != 'garantie')
					$('img#picto-7ans').css('display', 'none');
				else
					$('img#picto-7ans').css('display', 'block');
			}
			resetPage()
			{
				$('#pagesection1').html('');
				$('#pagesection2').html('');
				$('#pagesection3').html('');
				$('#container-image-coin-droit img').attr('src', '');
			}
		}
		//Instance de la classe Pagination pour la page "SERVICES"
		if($('div#page-services').length>0)
			new TraitementPaginationServices;







		if($('div#page-identite img#image-illustration-col-left').length>0)
		{
			
			$( window ).resize(function() {		checkImageIdentite();		});
			checkImageIdentite();

			function checkImageIdentite()
			{
				var image = 'div#page-identite img#image-illustration-col-left';
				var largeur = $(window).width();
				var url_img_min = $(image).data('image-min');
				var url_img_full = $(image).data('image-fullwidth');
				if(largeur < 1500)
				{
					$(image).attr('src', url_img_full);
					console.log(url_img_full);
				}
				else
				{
					$(image).attr('src', url_img_min);
					console.log(url_img_min);
				}
			}
		}
		
		
		
		
		
		
		