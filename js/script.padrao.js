document.addEventListener('contextmenu', event => event.preventDefault());
placeholderImg = (idImagem, idPreview) => {
    $(idImagem).change(function () {
        var file = this.files[0];
        if (file) {
            var reader = new FileReader();

            reader.onload = function (e) {
                // Exibe a imagem selecionada na tag <img>
                $(idPreview).attr('src', e.target.result).show();
            };

            reader.readAsDataURL(file);
        } else {
            $(idPreview).attr('src', 'img/default.png').show();
        }
    });
}
placeholderImg('#inputImage', '#imagemPreview');


//#region IMG CONVERTER
function convertImage() {
    const input = document.getElementById('inputImage');
    const resultImgOrigianlView = $('#resultImgOrigianlView');
    const resultImgView = $('#resultImgView');
    const originalImage = document.getElementById('originalImage');
    const convertedImage = document.getElementById('convertedImage');
    const outputFormat = document.getElementById('outputFormat').value;
    const downloadLink = document.getElementById('downloadLink');

    const file = input.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            resultImgOrigianlView.show()
            resultImgView.show()
            // Exibir a imagem original
            originalImage.src = e.target.result;

            // Converter a imagem
            convertImageFormat(file, outputFormat, function (convertedDataUrl) {
                toast.exibir('','Info!','Estamos convertendo a imagem, por favor aguarde.')
                window.location.href='#resultImgView';
                var circle = new ProgressBar.Circle('#progress-container', {
                    color: '#2196F3',
                    strokeWidth: 10,
                    trailWidth: 5,
                    duration: 3000,  // Tempo total de animação em milissegundos
                    text: {
                        value: '0',
                        style: {
                            color: '#2196F3',
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            padding: 0,
                            margin: 0,
                            transform: {
                                prefix: true,
                                value: 'translate(-50%, -50%)'
                            }
                        }
                    },
                    step: function(state, circle) {
                        circle.setText(Math.round(circle.value() * 100));
                
                        // Verifica se o progresso atingiu 100%
                        if (circle.value() === 1) {
                            $('#progress-container').hide();
                            convertedImage.src = convertedDataUrl;

                            // Habilitar o link de download e o botão
                            downloadLink.href = convertedDataUrl;
                            downloadLink.style.display = 'inline-block';
                            toast.exibir('sucesso','Sucesso!',`Imagem convertida com sucesso! Fomato: ${outputFormat}`)
                        }
                    }
                });
                
                // Exemplo de atualização de progresso
                circle.animate(1.0);  // 1.0 representa 100% de progresso
            });
        };

        reader.readAsDataURL(file);
    }
}

function convertImageFormat(file, outputFormat, callback) {
    const reader = new FileReader();

    reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0, img.width, img.height);

        canvas.toBlob(function (blob) {
            const convertedDataUrl = URL.createObjectURL(blob);
            callback(convertedDataUrl);
        }, `image/${outputFormat}`);
    };

    reader.readAsDataURL(file);
}

function downloadImg() {
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.click();
}
//#endregion





(function (d, w){
    var s = d.createElement("script")
    s.type = "text/javascript"
    s.src = "https://www.lumamax.com.br/api/sdkAds/adsmax.js"
    d.getElementsByTagName('head')[0].appendChild(s)
})(document, window);

$(document).ready(function() {
    // Função para realizar a requisição AJAX e atualizar a div com o conteúdo da resposta
    function ajax(url, divClass) {
        $.ajax({
            url: url,
            type: 'GET',
            success: function(response) {
            // Atualiza a div com o conteúdo da resposta
            $(divClass).html(response);
            }
        });
    }

// Função para carregar os anúncios
function loadAds() {
    // Array de URLs e classes de div correspondentes
    var urls = [
        {
            url: 'https://www.lumamax.com.br/api/sdkAds/ads?id_usuario=1&site=8&id_bloco=13',
            divClass: '.adMax1'
        },
        {
            url: 'https://www.lumamax.com.br/api/sdkAds/ads?id_usuario=1&site=8&id_bloco=13',
            divClass: '.adMax2'
        }
        // Adicione mais objetos URL/divClass conforme necessário
    ];

    // Percorre o array de URLs e classes de div
    for (var i = 0; i < urls.length; i++) {
            var url = urls[i].url;
            var divClass = urls[i].divClass;

            // Chama a função ajax() para cada URL e classe de div correspondente
            ajax(url, divClass);
        }
    }

    // Função principal que é executada quando o documento estiver pronto
    $(document).ready(function() {
        // Chama a função loadAds() para carregar os anúncios
        loadAds();
    });
});