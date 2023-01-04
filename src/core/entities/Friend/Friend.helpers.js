export async function filterRequest(response) {
  const blob = Buffer.from((await response.arrayBuffer()));
      const [type, ext] = response.headers
        .get('Content-Type')
        .split('/');

      if (!type.startsWith('image')) {
        throw new Error('The file must be an image');
      }

      return { blob, ext };
}

export function isExternalLink(link) {
  const pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  return pattern.test(link);
}
