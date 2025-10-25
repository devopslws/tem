//hex값만 받아서 쓴다
export function hexToSignedInt16(hexString: string): number[] {
  const result: number[] = [];

  for (let i = 0; i < hexString.length; i += 4) {
    const part = hexString.slice(i, i + 4);
    let value = parseInt(part, 16);
    if (value > 0x7FFF) value -= 0x10000; //2의 보수 보정
    result.push(value);
  }
  return result;
}