const sprites = new Image();
sprites.src ='./sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

///chão
const chao ={
    spriteX:0,
    spriteY:610,
    largura:224,
    altura:112,
    x:0,
    y:canvas.height -112,
    desenha(){
        contexto.drawImage(
            sprites,
            chao.spriteX,chao.spriteY,//posicao inicial da imagem
            chao.largura,chao.altura,//corte de altura e lagura da imagem
            chao.x,chao.y,//posição da imagem no canvas
            chao.largura,chao.altura//tamanho da imagem no canvas
            );
    
        contexto.drawImage(
                sprites,
                chao.spriteX,chao.spriteY,//posicao inicial da imagem
                chao.largura,chao.altura,//corte de altura e lagura da imagem
                (chao.x+chao.largura),chao.y,//posição da imagem no canvas
                chao.largura,chao.altura//tamanho da imagem no canvas
                );
        },
};

// Plano de fundo

const planoDeFundo ={
    spriteX:390,
    spriteY:0,
    largura:275,
    altura:204,
    x:0,
    y:canvas.height-204,
    desenha(){
        contexto.fillStyle= '#70c5ce';
        contexto.fillRect(0,0,canvas.width,canvas.height);


        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX,planoDeFundo.spriteY,
            planoDeFundo.largura,planoDeFundo.altura,
            planoDeFundo.x,planoDeFundo.y,
            planoDeFundo.largura,planoDeFundo.altura,
            );
        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX,planoDeFundo.spriteY,
            planoDeFundo.largura,planoDeFundo.altura,
            planoDeFundo.largura,planoDeFundo.y,
            planoDeFundo.largura,planoDeFundo.altura,
            ); 
    },
};



//passarinho
const flappyBird ={
    spriteX:0,
    spriteY:0,
    largura:33,
    altura:24,
    x:10,
    y:50,
    desenha(){
    contexto.drawImage(sprites,
    flappyBird.spriteX,flappyBird.spriteY,// sx, sy posiçoes do sprite
    flappyBird.largura,flappyBird.altura,//sWidth, sHeight, tamanhos do recorte na imagem sprite
    flappyBird.x,flappyBird.y, //dx, dy, posição dentro do canvas
    flappyBird.largura,flappyBird.altura//dWidth, dHeight
            );
    },
};




function loop(){
    planoDeFundo.desenha();
    chao.desenha();
    flappyBird.desenha();
    
    
    requestAnimationFrame(loop);
}

loop();