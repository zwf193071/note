## 简单代码
依其重要顺序：
- 能通过所有测试
- 没有重复代码
- 体现系统中的全部设计理念
- 包括尽量少的实体、比如类、方法、函数等

## 类名
类名和对象名应该是名词或名词短语，如Customer、WikiPage、Account和AddressParser。避免使用Manager、Processor、Data或Info这样的类名。类名不应当是动词。

### 有意义的命名
badcode<语境不明确的变量>
```
private void printGuessStatistics(char candidate, int count) {
    String number;
    String verb;
    String pluralModifier;
    if (count == 0) {
        number = "no";
        verb = "are";
        pluralModifier = "s";
    } else if (count == 1) {
        number = "1";
        verb = "is";
        pluralModifier = "";
    } else {
        number = Integer.toString(count);
        verb = "are";
        pluralModifier = "s";
    }
    String guessMessage = String.format("There %s %s %s%s", verb, number, candidate, pluralModifier)
}
```

goodcode<有语境的变量>
```
public class GuessStatisticsMessage {
    private String number;
    private String verb;
    private String pluralModifier;

    public String make(char candidate, int count) {
        createPluralDependentMessageParts(count);
        return String.format("There %s %s %s%s", verb, number, candidate, pluralModifier);
    }
    private void createPluralDependentMessageParts(int count) {
        if (count == 0) {
            thereAreNoLetters();
        } else if (count == 1) {
            thereIsOneLetter();
        } else {
            thereAreManyLetters(count);
        }
    }
    private void thereAreNoLetters() {
        number = "no";
        verb = "are";
        pluralModifier = "s";
    }
    private void thereIsOneLetter() {
        number = "1";
        verb = "is";
        pluralModifier = "";
    }
    private void thereAreManyLetters(int count) {
        number = Integer.toString(count);
        verb = "are";
        pluralModifier = "s";
    }
}
```

## 函数
### 短小
函数的第一规则是要短小，第二条规则是还要更短小

### 代码块和缩进
if语句、else语句、while语句等，其中的代码块应该只有一行。该行大抵应该是一个函数调用语句。
```
public static String renderPageWithSetupsAndTeardowns(PageData pageData, boolean isSuite) throws Exception {
    if (isTestPage(pageData)) includeSetupAndTeardownPages(pageData, isSuite);
    return pageData.getHtml();
}
```