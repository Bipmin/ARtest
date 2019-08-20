AFRAME.registerComponent('collide', {
        init: function() {
        this.interactiveAnimations();
        this.el.addEventListener('click', this.onClick);
    },
    
    //クリックしたオブジェクトを回転させる
    interactiveAnimations: function() {
        this.el.setAttribute('animation__click', 'property:rotation; from:; to: 0 360 0;  startEvents: click; dur:500 repeat: 1; loop: false;');
    },
    
    //クリック位置の取得とパーティクルの設定
    onClick: function(e) {
        var createEffect = function(point, particleAge) {
        var pointStr = point.x + ' ' + point.y + ' ' + point.z;
        var effect = document.createElement('a-entity');
        effect.setAttribute('position', pointStr);
        effect.setAttribute('raycaster', 'enabled: false');
        effect.setAttribute('particle-system', 'preset: defolt; texture: ./images/redheart.png; maxParticleCount: 100;maxAge: ' + (particleAge / 1000) + ';velocityValue:0 -1 0; accelerationValue: 0 0.5 0; duration: 1 repeat: 0; loop: false;');
        effect.setAttribute('sound', 'src: #decision; autoplay: true; loop: false;');
        return effect;
        };

        //パーティクルを表示させる
        var point = e.detail.intersection.point;
        var particleAge = 1500;
        var effect = createEffect(point, particleAge);
        var scene = document.querySelector('a-scene');
        scene.appendChild(effect);
        setTimeout(function() {
        scene.removeChild(effect);
        }, particleAge);
    }
});