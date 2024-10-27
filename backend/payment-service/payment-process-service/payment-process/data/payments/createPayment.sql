INSERT INTO [dbo].[payments]
    (
        [residenId],
        [paymentDate],
        [paymentTypeId],
        [amount],
        [paymentMethod],
        [deflag]
    )

VALUES(
    @residenId,
    @paymentDate,
    @paymentTypeId,
    @amount,
    @paymentMethod,
    @deflag
)

SELECT SCOPE_IDENITY() AS paymentId