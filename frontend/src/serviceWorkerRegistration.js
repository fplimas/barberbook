// Este código foi produzido pelo Create React App, mas modificado para melhorar a funcionalidade do PWA

// Este serviço funciona somente em produção
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // O construtor de URL está disponível em todos os browsers que suportam SW
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Nosso service worker não funcionará se PUBLIC_URL estiver em uma origem diferente
      // da nossa página. Isso pode acontecer se você usar um CDN para hospedar assets
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // Isso está rodando no localhost. Vamos verificar se um service worker ainda existe ou não.
        checkValidServiceWorker(swUrl, config);

        // Adicione alguns logs adicionais para localhost, apontando para os desenvolvedores material sobre
        // service workers/PWA
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'Este aplicativo está sendo servido em cache primeiro por um service ' +
              'worker. Para saber mais, visite https://cra.link/PWA'
          );
        });
      } else {
        // Não é localhost. Apenas registre o service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // Neste ponto, o antigo conteúdo será removido e
              // o novo conteúdo será adicionado ao cache.
              console.log(
                'Novo conteúdo está disponível e será usado quando todas ' +
                  'as abas para esta página forem fechadas.'
              );

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // Neste ponto, tudo foi pré-cacheado.
              console.log('O conteúdo está em cache para uso offline.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Erro durante o registro do service worker:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Verifique se o service worker pode ser encontrado. Se não, recarregue a página.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      // Certifique-se de que o service worker existe e que realmente estamos obtendo um arquivo JS.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // Nenhum service worker encontrado. Provavelmente uma aplicação diferente. Recarregue a página.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker encontrado. Prossiga normalmente.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log('Nenhuma conexão com a internet encontrada. O aplicativo está sendo executado no modo offline.');
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
} 