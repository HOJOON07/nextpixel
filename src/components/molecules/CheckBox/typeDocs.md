## 타입스크립트 유틸리티 타입

1. Partial

- 특정 타입의 부분 집합을 만족하는 타입을 정의한다.

2. Pick
   특정 타입에서 몇 개의 속성을 선택하여 타입을 정의한다.

3. Omit

- 특정 속성만 제거한 타입을 정의한다.

### TextElement 에서 readonly 속성에 대한 것.

이 코드에서 `readOnly={!onChange}` 부분은 `CheckBox` 컴포넌트의 행동 방식을 결정합니다. 이 부분을 이해하기 위해서는 React의 `readOnly`와 `onChange` 속성에 대한 기본적인 지식이 필요합니다.

1. **`readOnly` 속성**: 이 속성은 입력 필드가 읽기 전용임을 나타냅니다. `readOnly`가 `true`로 설정된 경우, 사용자는 필드의 값을 변경할 수 없습니다.

2. **`onChange` 속성**: 이는 입력 필드의 값이 변경될 때 호출되는 콜백 함수입니다. 사용자가 필드에 입력을 하면 `onChange` 이벤트가 발생하고, 이에 대응하는 함수가 실행됩니다.

`readOnly={!onChange}`는 다음과 같은 의미를 가집니다:

- `onChange` 함수가 `props`로 전달되지 않았다면 (`undefined` 또는 `null`인 경우), `readOnly` 속성을 `true`로 설정합니다. 즉, `onChange` 핸들러가 없으면 사용자는 체크박스의 상태를 직접 변경할 수 없습니다.
- 반면, `onChange` 함수가 전달되었다면 (`onChange`가 정의되어 있다면), `readOnly` 속성은 `false`가 됩니다. 이 경우 사용자가 체크박스를 클릭하여 상태를 변경할 수 있으며, 이 변경은 `onChange` 함수를 통해 처리됩니다.

이 로직의 목적은 사용자가 직접 체크박스를 변경할 수 있는지 여부를 `onChange` 존재 여부에 따라 결정하는 것입니다. `onChange` 핸들러가 없으면 체크박스는 사용자의 직접적인 상호작용을 통해 변경될 수 없게 됩니다. 이는 컴포넌트가 제어되는 방식(즉, 'controlled component')과 비제어 방식('uncontrolled component') 사이의 차이점을 처리하는 하나의 방법입니다.
